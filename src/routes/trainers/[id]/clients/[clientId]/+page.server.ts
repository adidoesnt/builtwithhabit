import { supabase } from '$lib/server/auth';
import { Role } from '$lib/server/db/schema';
import { getClientById, getTrainerClients } from '$lib/server/db/trainer';
import { getUserById, getUserProfilePictureUrl } from '$lib/server/db/user.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, params }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		console.log('No access token');
		throw redirect(303, '/login');
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		console.log('User not found', authUser.data.user);
		throw redirect(303, '/login');
	}

	const trainer = await getUserById(authUser.data.user.id);

	if (!trainer) {
		console.log('Trainer not found', authUser.data.user.id);
		throw redirect(303, '/login');
	}

	if (!trainer.roles.includes(Role.TRAINER)) {
		console.log('User is not a trainer', authUser.data.user.id);
		throw redirect(303, '/');
	}

	const trainerClients = await getTrainerClients({
		page: 0,
		pageSize: Number.MAX_SAFE_INTEGER
	});

	if (!trainerClients.clients.find((client) => client.id === params.clientId)) {
		console.log('Client not found for trainer', trainer.id, 'and client', params.clientId);
		throw redirect(303, '/');
	}

	const { id: trainerId, clientId } = params;
	if (!clientId) {
		console.log('Client ID is required');
		throw redirect(303, '/');
	}

	const client = await getClientById(clientId);
	const clientProfilePictureUrl = await getUserProfilePictureUrl(client.id);

	return {
		trainer: { id: trainerId },
		client,
		clientProfilePictureUrl
	};
};
