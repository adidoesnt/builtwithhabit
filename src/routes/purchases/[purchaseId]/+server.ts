import { supabase } from '$lib/server/auth';
import { updatePaymentIntentClientSecret } from '$lib/server/db/bookings.js';
import { getUserById } from '$lib/server/db/user';
import { json } from '@sveltejs/kit';

export const PUT = async ({ request, params, cookies }) => {
	try {
		const accessToken = cookies.get('access_token');

		if (!accessToken) {
			return json({ success: false, error: 'No access token found' }, { status: 401 });
		}

		const authUser = await supabase.auth.getUser(accessToken);

		if (!authUser.data.user) {
			return json({ success: false, error: 'No user found' }, { status: 401 });
		}

		const user = await getUserById(authUser.data.user.id);

		if (!user) {
			return json({ success: false, error: 'User not found' }, { status: 401 });
		}

		const { paymentIntentClientSecret } = await request.json();
		const { purchaseId } = params;

		const id = Number(purchaseId);
		if (isNaN(id)) {
			return json({ success: false, error: 'Invalid purchase ID' }, { status: 400 });
		}

		await updatePaymentIntentClientSecret(id, paymentIntentClientSecret);
		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error updating payment intent client secret:', error);
		return json({ success: false, error: 'Internal server error' }, { status: 500 });
	}
};
