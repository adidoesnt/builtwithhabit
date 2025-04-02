import { PUBLIC_STRIPE_KEY } from '$env/static/public';
import { getLocations } from '$lib/server/db/locations.js';
import { getPackageById } from '$lib/server/db/packages';
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

	return {
		package: fetchedPackage,
		locations,
	};
};
