import { supabase } from '$lib/server/auth';
import { getClientById, getTrainerClients } from '$lib/server/db/trainer';
import { getUserById } from '$lib/server/db/user';
import { listFilesInDir } from '$lib/server/s3';
import { Role } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';
import { UserDir } from '../../../../../../../lib/types';

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

	const { clientId, id: trainerId } = params;
	if (!clientId) {
		console.log('Client ID is required');
		throw redirect(303, '/');
	}

	const client = await getClientById(clientId);

	console.log('Listing files for client', clientId);
	const files = await listFilesInDir(clientId, UserDir.TRAINER_NOTES);

	console.log('Files', files);

	return {
		client,
		files,
		trainerId
	};
};
