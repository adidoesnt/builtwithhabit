import { getAllPackages } from '$lib/server/db/packages';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	try {
		const packages = await getAllPackages();
		return json(packages);
	} catch (error) {
		console.error('Error fetching packages:', error);
		return json({ error: 'Failed to fetch packages' }, { status: 500 });
	}
};
