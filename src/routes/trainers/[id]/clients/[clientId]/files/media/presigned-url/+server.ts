import { supabase } from '$lib/server/auth/index.js';
import { getTrainerClients } from '$lib/server/db/trainer.js';
import { getUserById } from '$lib/server/db/user.js';
import { getPresignedUrlForUpload, UserDir } from '$lib/server/s3/index.js';
import { Role } from '$lib/stores/auth.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ params, url, cookies }) {
	const { clientId } = params;

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

	const query = url.searchParams;

	const fileName = query.get('fileName');

	if (!fileName) {
		return new Response('Missing fileName', { status: 400 });
	}

	try {
		const presignedUrl = await getPresignedUrlForUpload(clientId, UserDir.MEDIA, fileName);
		return new Response(JSON.stringify({ presignedUrl }));
	} catch (error) {
		console.error(error);
		return new Response('Error getting presigned url', { status: 500 });
	}
}
