import { getAllPackages } from '$lib/server/db/packages';
import { getClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const client = getClient(fetch);

	const testimonials = await client.request(
		readItems('testimonials', {
			fields: ['id', 'name', 'content', 'rating', 'date_created'],
			sort: '-date_created'
		})
	);

	const packages = await getAllPackages();

	return { packages, testimonials };
};
