import { deletePurchaseByClientSecret, updatePurchaseStatus } from '$lib/server/db/bookings';
import type { PaymentIntent } from '@stripe/stripe-js';
import { json } from '@sveltejs/kit';
import { WebhookEvent, PurchaseStatus } from '../types';

export const POST = async ({ request }) => {
	try {
		const event = await request.json();
		console.log('Received webhook event:', event.type);

		let paymentIntent: PaymentIntent | null = null;
		switch (event.type) {
			case WebhookEvent.PaymentIntentSucceeded:
			case WebhookEvent.ChargeSucceeded:
				paymentIntent = event.data.object as PaymentIntent;
				console.log('Updating purchase status for client secret:', paymentIntent.client_secret);
				await updatePurchaseStatus(paymentIntent.client_secret!, PurchaseStatus.CONFIRMED);
				break;
			case WebhookEvent.PaymentIntentPaymentFailed:
				console.log('Payment failed:', event.data.object);
				paymentIntent = event.data.object as PaymentIntent;
				await updatePurchaseStatus(paymentIntent.client_secret!, PurchaseStatus.FAILED);
				setTimeout(async () => {
					await deletePurchaseByClientSecret(paymentIntent!.client_secret!);
				}, 20000);
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
