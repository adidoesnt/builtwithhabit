import { json } from '@sveltejs/kit';

enum WebhookEvent {
	PaymentIntentSucceeded = 'payment_intent.succeeded',
	PaymentIntentPaymentFailed = 'payment_intent.payment_failed'
}

export const POST = async ({ request }) => {
	const event = await request.json();

	let paymentIntent;
	switch (event.type) {
		case 'payment_intent.succeeded':
			paymentIntent = event.data.object;

			// TODO: handle payment intent succeeded
			break;
		case 'payment_intent.payment_failed':
			paymentIntent = event.data.object;

			// TODO: handle payment intent payment failed
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
			break;
	}

	return json({ received: true }, { status: 200 });
};
