import { confirmPurchaseStatus } from '$lib/server/db/bookings';
import type { PaymentIntent } from '@stripe/stripe-js';
import { json } from '@sveltejs/kit';

enum WebhookEvent {
	PaymentIntentSucceeded = 'payment_intent.succeeded',
	PaymentIntentPaymentFailed = 'payment_intent.payment_failed',
	ChargeSucceeded = 'charge.succeeded',
	ChargeUpdated = 'charge.updated'
}

export const POST = async ({ request }) => {
	try {
		const event = await request.json();
		console.log('Received webhook event:', event.type);

		let paymentIntent: PaymentIntent | null = null;
		switch (event.type) {
			case WebhookEvent.PaymentIntentSucceeded:
			case WebhookEvent.ChargeSucceeded:
				paymentIntent = event.data.object as PaymentIntent;
				const { client_secret } = paymentIntent;
				console.log('Updating purchase status for client secret:', client_secret);
				await confirmPurchaseStatus(client_secret!);
				break;
			case WebhookEvent.PaymentIntentPaymentFailed:
				console.log('Payment failed:', event.data.object);
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
