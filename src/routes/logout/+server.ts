import { supabase } from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';
import { clearUser } from '$lib/stores/auth';

export const POST = async ({ cookies }) => {
	const accessToken = cookies.get('access_token');

	if (accessToken) {
		await supabase.auth.signOut();
		cookies.delete('access_token', { path: '/' });
		cookies.delete('refresh_token', { path: '/' });
		clearUser();
        return redirect(303, '/login');
	} else {
		return error(401, 'Unauthorized');
    }
};
