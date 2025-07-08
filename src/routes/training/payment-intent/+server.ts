import { supabase } from '$lib/server/auth';
import { getUserById } from '$lib/server/db/user';
import stripe from '$lib/server/stripe/index';

const CURRENCY = 'sgd';

export const POST = async ({ request, cookies }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		return new Response('Unauthorized', { status: 401 });
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { amount } = await request.json();

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: CURRENCY,
		automatic_payment_methods: { enabled: true }
	});

	return new Response(
		JSON.stringify({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id
		}),
		{
			status: 200
		}
	);
};
