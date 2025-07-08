import { getAllPackages } from '$lib/server/db/packages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const packages = await getAllPackages();
	return { packages };
};
