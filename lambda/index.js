const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const Stripe = require('stripe');

const secretsManagerClient = new SecretsManagerClient({ region: 'us-east-1' });

const getStripeSecret = async () => {
	const command = new GetSecretValueCommand({ SecretId: 'bwh-stripe-keys' });
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
			const body = JSON.parse(record.body);
			const { payment_intent_id } = body;

			console.log('Checking payment status for for client_secret', client_secret);

			const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
			const { client_secret, status } = paymentIntent;

			console.log('Payment intent status:', status);
		})
	);

	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'Payment intents checked' })
	};
};
