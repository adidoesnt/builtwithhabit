import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const email = url.searchParams.get('email');

	console.log('User email:', { email });

	return { email };
};
