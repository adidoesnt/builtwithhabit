import { supabase, supabaseAdmin } from '$lib/server/auth';
import { Role, type UserCreateAttributes } from '$lib/server/db/schema';
import { deleteUser, getUserById, updateUser } from '$lib/server/db/user';
import type { Cookies } from '@sveltejs/kit';

const checkIsAdmin = async ({ cookies }: { cookies: Cookies }) => {
	const accessToken = cookies.get('access_token');
	if (!accessToken) return false;

	const authUser = await supabase.auth.getUser(accessToken);
	if (!authUser.data.user) return false;

	const currentUser = await getUserById(authUser.data.user.id);
	if (!currentUser) return false;

	return currentUser.roles.includes(Role.ADMIN);
};

export const PUT = async ({ params, request, cookies }) => {
	const isAdmin = await checkIsAdmin({ cookies });

	if (!isAdmin) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { id } = params;
	const { firstName, lastName, email, roles } = await request.json();
	const user = await updateUser(id, {
		firstName,
		lastName,
		email,
		roles
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
