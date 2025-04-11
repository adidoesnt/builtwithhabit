import { supabase } from '$lib/server/auth';
import { getBookingById } from '$lib/server/db/bookings';
import { Role } from '$lib/server/db/schema';
import { getUserById } from '$lib/server/db/user.js';
import { json, redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const bookingId = Number(params.id);
	const accessToken = cookies.get('access_token');

	if (isNaN(bookingId)) {
		return json(
			{
				error: 'Invalid booking ID'
			},
			{ status: 400 }
		);
	}

	const booking = await getBookingById(bookingId);

	if (!booking) {
		return json(
			{
				error: 'Booking not found'
			},
			{ status: 404 }
		);
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		throw redirect(303, '/login');
	}

	const user = await getUserById(authUser.data.user.id);
	const isAdmin = user.roles.includes(Role.ADMIN);

	const isTrainerForBooking = booking.trainer?.id === authUser.data.user.id;
	const isClientForBooking = booking.client?.id === authUser.data.user.id;

	if (!isTrainerForBooking && !isClientForBooking && !isAdmin) {
		console.log('User is not authorised to view this booking');
		throw redirect(303, '/bookings');
	}

	return {
		booking,
		isTrainerForBooking,
		isClientForBooking,
		isAdmin
	};
};
