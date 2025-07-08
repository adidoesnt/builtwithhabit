import { supabase } from '$lib/server/auth';
import { getBookingById } from '$lib/server/db/bookings';
import { Role } from '$lib/server/db/schema';
import { getUserById } from '$lib/server/db/user.js';
import { getPresignedUrlForViewOrDownload } from '$lib/server/s3/index.js';
import { UserDir } from '$lib/types.js';
import { json, redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies, fetch }) => {
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
		throw redirect(303, '/training/login');
	}

	const user = await getUserById(authUser.data.user.id);
	const isAdmin = user.roles.includes(Role.ADMIN);

	const clientId = booking.client?.id;
	const trainerId = booking.trainer?.id;

	if (!clientId || !trainerId) {
		throw redirect(303, '/training/bookings');
	}

	const isTrainerForBooking = trainerId === authUser.data.user.id;
	const isClientForBooking = clientId === authUser.data.user.id;

	if (!isTrainerForBooking && !isClientForBooking && !isAdmin) {
		console.log('User is not authorised to view this booking');
		throw redirect(303, '/training/bookings');
	}

	const bookingNotesPresignedUrlForView = await getPresignedUrlForViewOrDownload(
		clientId,
		UserDir.TRAINER_NOTES,
		`booking-${booking.id}-notes.txt`
	);

	const bookingNotesFile = await fetch(bookingNotesPresignedUrlForView);

	const bookingNotesFileText = !bookingNotesFile.ok ? null : await bookingNotesFile.text();

	return {
		booking,
		isTrainerForBooking,
		isClientForBooking,
		isAdmin,
		bookingNotesFileText
	};
};
