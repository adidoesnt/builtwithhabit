import { PUBLIC_STRIPE_KEY } from '$env/static/public';
import { getAllBookings } from '$lib/server/db/bookings.js';
import { getLocations } from '$lib/server/db/locations.js';
import { getPackageById } from '$lib/server/db/packages';
import { getTrainerAvailability, getTrainerOverrides } from '$lib/server/db/trainer';
import { loadStripe } from '@stripe/stripe-js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id: idString } = params;

	if (!idString) {
		throw error(404, 'Package ID is required');
	}

	const id = Number(idString);

	if (isNaN(id)) {
		throw error(400, 'Invalid package ID');
	}

	const fetchedPackage = await getPackageById(id);

	if (!fetchedPackage) {
		throw error(404, 'Package not found');
	}

	const locations = await getLocations();
	const bookings = await getAllBookings();
	const trainerAvailability = await getTrainerAvailability();
	const trainerOverrides = await getTrainerOverrides();

	return {
		package: fetchedPackage,
		locations,
		bookings,
		trainerAvailability,
		trainerOverrides
	};
};
