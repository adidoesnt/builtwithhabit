import { supabase } from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	const accessToken = cookies.get('access_token');

	if (accessToken) {
		await supabase.auth.signOut();
		cookies.delete('access_token', { path: '/' });
		cookies.delete('refresh_token', { path: '/' });
		return redirect(303, '/training/login');
	} else {
		return error(401, 'Unauthorized');
	}
};
