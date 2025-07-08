import { supabase } from '$lib/server/auth';
import { getTrainerClients } from '$lib/server/db/trainer';
import { getUserById } from '$lib/server/db/user';
import { Role } from '$lib/server/db/schema';

export const GET = async ({ url, cookies, params }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		return new Response('Unauthorized', { status: 401 });
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}

	if (!user.roles.includes(Role.TRAINER)) {
		return new Response('Forbidden', { status: 403 });
	}

	const { id } = params;
	const isSelf = id === authUser.data.user.id;
	if (!isSelf) {
		return new Response('Forbidden', { status: 403 });
	}

	const page = url.searchParams.get('page') || '0';
	const pageSize = url.searchParams.get('pageSize') || '10';
	const search = url.searchParams.get('search') || '';

	let numericPage = Number(page);
	let numericPageSize = Number(pageSize);

	if (isNaN(numericPage) || isNaN(numericPageSize)) {
		return new Response('Invalid page or page size', { status: 400 });
	}

	const clientsResponse = await getTrainerClients(
		{ page: numericPage, pageSize: numericPageSize },
		search
	);

	return new Response(JSON.stringify(clientsResponse), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
