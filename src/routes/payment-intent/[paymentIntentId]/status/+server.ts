import { supabase } from '$lib/server/auth';
import { getPurchaseStatusByPaymentIntentId } from '$lib/server/db/bookings';
import { getUserById } from '$lib/server/db/user.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, cookies }) {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		return json({ error: 'No access token found' }, { status: 401 });
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		return json({ error: 'No user found' }, { status: 401 });
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		return json({ error: 'User not found' }, { status: 401 });
	}

	const { paymentIntentId } = params;

	const status = await getPurchaseStatusByPaymentIntentId(paymentIntentId);

	return json({ status });
}
