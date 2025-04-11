import { supabase } from '$lib/server/auth/index.js';
import { getUserById } from '$lib/server/db/user.js';
import { getPresignedUrlForUpload, UserDir } from '$lib/server/s3/index.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
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

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		console.log('User not found', authUser.data.user.id);
		throw redirect(303, '/login');
	}

	const query = url.searchParams;
	const fileName = query.get('fileName');

	if (!fileName) {
		return new Response('Missing fileName', { status: 400 });
	}

	try {
		const presignedUrl = await getPresignedUrlForUpload(user.id, UserDir.PROFILE_PICTURE, fileName);
		return new Response(JSON.stringify({ presignedUrl }));
	} catch (error) {
		console.error(error);
		return new Response('Error getting presigned url', { status: 500 });
	}
}
