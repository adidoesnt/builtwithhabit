import { deletePurchaseByPaymentIntentId, updatePurchaseStatus } from '$lib/server/db/bookings';
import type { PaymentIntent } from '@stripe/stripe-js';
import { json } from '@sveltejs/kit';
import { WebhookEvent, PurchaseStatus } from '../types';
import stripe from '$lib/server/stripe';
import { env } from '$env/dynamic/private';
import { sendMessage } from '$lib/server/sqs';

const { STRIPE_WEBHOOK_SECRET } = env;

if (!STRIPE_WEBHOOK_SECRET) {
	throw new Error('STRIPE_WEBHOOK_SECRET is not set');
}

export const POST = async ({ request }) => {
	try {
		const signature = request.headers.get('stripe-signature');
		if (!signature) {
			return json({ error: 'No signature found' }, { status: 400 });
		}

		const body = await request.text();
		let event;

		try {
			event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
		} catch (err) {
			console.error('Webhook signature verification failed:', err);
			return json({ error: 'Invalid signature' }, { status: 400 });
		}

		console.log('Received webhook event:', event.type);

		let paymentIntent: PaymentIntent | null = null;
		switch (event.type) {
			case WebhookEvent.PaymentIntentCreated:
				paymentIntent = event.data.object as PaymentIntent;
				await sendMessage({ payment_intent_id: paymentIntent.id });
				break;
			case WebhookEvent.PaymentIntentSucceeded:
			case WebhookEvent.ChargeSucceeded:
				paymentIntent = event.data.object as PaymentIntent;
				console.log('Updating purchase status for client secret:', paymentIntent.client_secret);
				await updatePurchaseStatus(paymentIntent.client_secret!, PurchaseStatus.CONFIRMED);
				break;
			case WebhookEvent.PaymentIntentCanceled:
			case WebhookEvent.PaymentIntentPaymentFailed:
				console.log('Payment failed:', event.data.object);
				paymentIntent = event.data.object as PaymentIntent;
				await updatePurchaseStatus(paymentIntent.client_secret!, PurchaseStatus.FAILED);
				await deletePurchaseByPaymentIntentId(paymentIntent!.client_secret!);
				break;
			case WebhookEvent.ChargeUpdated:
				console.log('Charge updated:', event.data.object);
				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
				break;
		}

		return json({ received: true });
	} catch (error) {
		console.error('Webhook error:', error);
		return json({ error: 'Webhook handler failed' }, { status: 500 });
	}
};
