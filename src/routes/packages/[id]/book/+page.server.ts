import { getPackageById } from '$lib/server/db/packages';
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

	return {
		package: fetchedPackage
	};
};
