const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const Stripe = require('stripe');

const secretsManagerClient = new SecretsManagerClient({ region: 'ap-southeast-1' });

const getStripeSecret = async () => {
	const command = new GetSecretValueCommand({ SecretId: 'bwh-stripe-keys-2' });
	const response = await secretsManagerClient.send(command);
	return JSON.parse(response.SecretString);
};

const getStripeClient = async () => {
	const { secret_stripe_key: stripeSecretKey } = await getStripeSecret();
	return new Stripe(stripeSecretKey);
};

exports.handler = async (event) => {
	console.log('Received event:', JSON.stringify(event, null, 2));

	console.log('Getting stripe client...');
	const stripe = await getStripeClient();

	const { Records } = event;

	console.log('Processing records...');
	await Promise.allSettled(
		Records.map(async (record) => {
			try {
				const body = JSON.parse(record.body);
				const { payment_intent_id } = body;

				console.log('Checking payment status for payment_intent_id:', payment_intent_id);

				const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
				const { status } = paymentIntent;

				console.log('Payment intent status:', status);

				if (
					[
						'requires_payment_method',
						'requires_capture',
						'requires_confirmation',
						'requires_action'
					].includes(status)
				) {
					console.log('Payment intent status is not succeeded, releasing booked slots');

					await stripe.paymentIntents.cancel(payment_intent_id);
				} else if (status === 'succeeded') {
					console.log('Payment intent status is succeeded, releasing booked slots');
				}
			} catch (error) {
				console.error('Error processing record:', error);
			}
		})
	);

	const allSucceeded = results.every((result) => result.status === 'fulfilled');

	if (allSucceeded) {
		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'All payment intents checked' })
		};
	} else {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Some payment intents failed' })
		};
	}
};
