import { supabase } from '..';

export async function loginWithEmail(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		return {
			user: null,
			session: null,
			error: error.message
		};
	}

	return {
		user: data.user,
		session: data.session,
		error: null
	};
}
