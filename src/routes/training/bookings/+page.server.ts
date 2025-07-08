import { supabase } from '$lib/server/auth/index.js';
import { getUserById } from '$lib/server/db/user.js';
import { Role } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBookingsByUserId, getBookingsForTrainer } from '$lib/server/db/bookings';

export const load = (async ({ cookies, url }) => {
	const page = url.searchParams.get('page') || '0';
	const pageSize = url.searchParams.get('pageSize') || '5';

	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		throw redirect(303, '/training/login');
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		throw redirect(303, '/training/login');
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		throw redirect(303, '/training/login');
	}

	console.log('Getting bookings for user', user.id);

	if (user.roles.includes(Role.USER)) {
		const bookings = await getBookingsByUserId(user.id, {
			page: parseInt(page),
			pageSize: parseInt(pageSize)
		});

		console.log('Bookings for user', user.id, bookings);

		return {
			bookings
		};
	} else if (user.roles.includes(Role.TRAINER)) {
		const bookings = await getBookingsForTrainer();

		console.log('Bookings for trainer', user.id, bookings);

		return {
			bookings
		};
	}

	throw redirect(303, '/training');
}) satisfies PageServerLoad;
