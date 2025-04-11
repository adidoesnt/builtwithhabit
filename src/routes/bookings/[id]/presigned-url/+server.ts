import { supabase } from '$lib/server/auth/index.js';
import { getBookingById } from '$lib/server/db/bookings';
import { getUserById } from '$lib/server/db/user.js';
import { getPresignedUrlForUpload, UserDir } from '$lib/server/s3/index.js';
import { Role } from '$lib/stores/auth.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ params, url, cookies }) {
	const { id } = params;

	const bookingId = Number(id);

	if (isNaN(bookingId)) {
		console.log('Invalid booking ID', id);
		throw redirect(303, '/');
	}

	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		console.log('No access token');
		throw redirect(303, '/login');
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		console.log('User not found', authUser.data.user);
		throw redirect(303, '/login');
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		console.log('User not found', authUser.data.user.id);
		throw redirect(303, '/login');
	}

	const booking = await getBookingById(bookingId);

	if (!booking) {
		console.log('Booking not found', bookingId);
		throw redirect(303, '/');
	}

	const isTrainerForBooking = booking.trainer?.id === user.id;
	const isClientForBooking = booking.client?.id === user.id;
	const isAdmin = user.roles.includes(Role.ADMIN);

	if (!isTrainerForBooking && !isClientForBooking && !isAdmin) {
		console.log('User does not have access to booking', bookingId);
		throw redirect(303, '/');
	}

	const query = url.searchParams;

	const fileName = query.get('fileName');
	const clientId = query.get('clientId');

	if (!fileName || !clientId) {
		return new Response('Missing fileName or clientId', { status: 400 });
	}

	try {
		const presignedUrl = await getPresignedUrlForUpload(clientId, UserDir.TRAINER_NOTES, fileName);
		return new Response(JSON.stringify({ presignedUrl }));
	} catch (error) {
		console.error(error);
		return new Response('Error getting presigned url', { status: 500 });
	}
}
