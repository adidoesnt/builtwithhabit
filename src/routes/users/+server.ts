import { getAllUsers, getUserById } from '$lib/server/db/user';

import { supabase } from '$lib/server/auth';
import type { Cookies } from '@sveltejs/kit';
import { Role } from '$lib/stores/auth';

const checkIsAdmin = async ({ cookies }: { cookies: Cookies }) => {
	const accessToken = cookies.get('access_token');
	if (!accessToken) return false;

	const authUser = await supabase.auth.getUser(accessToken);
	if (!authUser.data.user) return false;

	const currentUser = await getUserById(authUser.data.user.id);
	if (!currentUser) return false;

	return currentUser.roles.includes(Role.ADMIN);
};

export const GET = async ({ url, cookies }) => {
	const isAdmin = await checkIsAdmin({ cookies });

	if (!isAdmin) {
		return new Response('Unauthorized', { status: 401 });
	}

	const page = url.searchParams.get('page') ?? '0';
	const pageSize = url.searchParams.get('pageSize') ?? '10';
	const search = url.searchParams.get('search') ?? '';

	const numericPage = parseInt(page);
	const numericPageSize = parseInt(pageSize);

	if (isNaN(numericPage) || isNaN(numericPageSize)) {
		return new Response('Invalid page or page size', { status: 400 });
	}

	const users = await getAllUsers({ page: numericPage, pageSize: numericPageSize }, search);

	return new Response(JSON.stringify(users), { status: 200 });
};
