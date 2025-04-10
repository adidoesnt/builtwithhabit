import { supabase } from '$lib/server/auth';
import { Role } from '$lib/server/db/schema';
import { getTrainerClients } from '$lib/server/db/trainer';
import { getUserById } from '$lib/server/db/user.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, params, url }) => {
	const accessToken = cookies.get('access_token');

	const { id: trainerId } = params;

	const query = url.searchParams;
	const page = parseInt(query.get('page') || '0');
	const pageSize = parseInt(query.get('pageSize') || '10');

	if (!accessToken) {
		throw redirect(303, '/login');
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		throw redirect(303, '/login');
	}

	const trainer = await getUserById(authUser.data.user.id);

	if (!trainer) {
		throw redirect(303, '/login');
	}

	if (!trainer.roles.includes(Role.TRAINER)) {
		throw redirect(303, '/');
	}

	const clientsResponse = await getTrainerClients({ page, pageSize });
	const { clients, totalCount } = clientsResponse;

	return {
		clients,
		totalCount,
		trainerId
	};
};
