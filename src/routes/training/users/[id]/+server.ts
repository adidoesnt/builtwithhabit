import { supabase, supabaseAdmin } from '$lib/server/auth';
import { Role, type UserCreateAttributes } from '$lib/server/db/schema';
import { deleteUser, getUserById, updateUser } from '$lib/server/db/user';
import type { Cookies } from '@sveltejs/kit';

const getCurrentUser = async ({ cookies }: { cookies: Cookies }) => {
	const accessToken = cookies.get('access_token');
	if (!accessToken) return null;

	const authUser = await supabase.auth.getUser(accessToken);
	if (!authUser.data.user) return null;

	const currentUser = await getUserById(authUser.data.user.id);
	if (!currentUser) return null;

	return currentUser;
};

const checkIsAdmin = async ({ cookies }: { cookies: Cookies }) => {
	const currentUser = await getCurrentUser({ cookies });
	if (!currentUser) return false;

	return currentUser.roles.includes(Role.ADMIN);
};

const checkIsSelf = async ({ params, cookies }: { params: { id: string }; cookies: Cookies }) => {
	const currentUser = await getCurrentUser({ cookies });
	if (!currentUser) return false;

	return currentUser.id === params.id;
};

export const PUT = async ({ params, request, cookies }) => {
	const isAdmin = await checkIsAdmin({ cookies });
	const isSelf = await checkIsSelf({ params, cookies });

	if (!isAdmin && !isSelf) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { id } = params;
	const { firstName, lastName, roles } = await request.json();

	const currentUser = await getCurrentUser({ cookies });
	if (!currentUser) return new Response('Unauthorized', { status: 401 });

	// Only admins can update roles
	const rolesToUpdate = isAdmin ? roles : currentUser.roles;

	const user = await updateUser(id, {
		firstName,
		lastName,
		roles: rolesToUpdate ?? currentUser.roles
	} as UserCreateAttributes & { roles: Role[] });

	return new Response(JSON.stringify(user), { status: 200 });
};

export const DELETE = async ({ params, cookies }) => {
	const isAdmin = await checkIsAdmin({ cookies });

	if (!isAdmin) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { id } = params;
	const deletedProfile = !!(await deleteUser(id));
	const deletedUser = await supabaseAdmin.deleteUser(id);

	if (deletedUser.error) {
		return new Response(JSON.stringify(deletedUser.error), { status: 500 });
	}

	return new Response(JSON.stringify(deletedProfile), { status: 200 });
};
