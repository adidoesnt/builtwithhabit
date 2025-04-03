import { supabase, supabaseAdmin } from '$lib/server/auth/index.js';
import { getAllUsers, getUserById } from '$lib/server/db/user.js';
import { Role } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

	if (!user.roles.includes(Role.ADMIN)) {
		throw redirect(303, '/');
	}

	const users = await getAllUsers();
	const usersWithVerificationStatus = await Promise.all(
		users.items.map(async (user) => {
			const result = await supabaseAdmin.getUserById(user.id);
			const {
				data: { user: authUser },
				error
			} = result;

			if (error) {
				console.error('Error fetching user verification status', error);
			}

			const isVerified = !!authUser?.email_confirmed_at;

			return {
				...user,
				isVerified
			};
		})
	);

	return {
		users: usersWithVerificationStatus,
		total: users.total
	};
}) satisfies PageServerLoad;
