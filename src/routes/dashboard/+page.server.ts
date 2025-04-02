import { supabase } from '$lib/server/auth';
import { getRecentPurchasesByUserId, getUpcomingBookingsByUserId } from '$lib/server/db/bookings';
import { getUserById } from '$lib/server/db/user';
import { Role } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		throw redirect(302, '/login');
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		throw redirect(302, '/login');
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		throw redirect(302, '/login');
	}

	if (user.roles.includes(Role.USER)) {
		const bookings = await getUpcomingBookingsByUserId(user.id);
		const purchases = await getRecentPurchasesByUserId(user.id);

		return {
			bookings,
			purchases
		};
	}
};
