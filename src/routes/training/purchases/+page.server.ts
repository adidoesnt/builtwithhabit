import { supabase } from '$lib/server/auth/index.js';
import { getUserById } from '$lib/server/db/user.js';
import { Role } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPurchasesByUserId } from '$lib/server/db/bookings';

export const load = (async ({ cookies }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		throw redirect(303, '/login');
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		throw redirect(303, '/login');
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		throw redirect(303, '/login');
	}

	if (user.roles.includes(Role.USER)) {
		const purchases = await getPurchasesByUserId(user.id);

		return {
			purchases
		};
	}

	throw redirect(303, '/training');
}) satisfies PageServerLoad;
