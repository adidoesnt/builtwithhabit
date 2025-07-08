import { supabase } from '$lib/server/auth';
import { createUnconfirmedPurchase } from '$lib/server/db/bookings';
import { getUserById } from '$lib/server/db/user';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	try {
		const accessToken = cookies.get('access_token');
		const { packageId, address, postalCode, slots } = await request.json();

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

		const purchase = await createUnconfirmedPurchase(
			user.id,
			packageId,
			address,
			postalCode,
			slots
		);

		return json(
			{
				success: true,
				message: 'Unconfirmed purchase created successfully',
				purchaseId: purchase.id
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return json({ success: false, error: 'Internal server error' }, { status: 500 });
	}
};
