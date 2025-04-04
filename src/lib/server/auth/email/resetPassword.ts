import { supabase } from '..';
import { env } from '$env/dynamic/public';

const { PUBLIC_APP_URL } = env;

export const sendPasswordResetEmail = async (email: string) => {
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${PUBLIC_APP_URL}/login`
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const resetPassword = async (password: string) => {
	const { data, error } = await supabase.auth.updateUser({
		password
	});

	if (error) {
		throw new Error(error.message);
	};

	return data;
};