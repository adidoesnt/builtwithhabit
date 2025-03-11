import { isValidLocation } from '$lib/server/db/locations.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const { postalCode } = params;

	if (!postalCode || postalCode.length !== 6) {
		return new Response('Invalid postal code', { status: 400 });
	}

	const { isValid, address } = await isValidLocation(postalCode);

	if (!isValid) {
		return new Response('Invalid postal code', { status: 400 });
	}

	return json({ isValid, address }, { status: 200 });
};
