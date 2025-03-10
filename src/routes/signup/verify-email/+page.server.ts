import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { supabase } from '$lib/server/auth';

const getUserVerificationStatus = async (accessToken: string) => {
	const { data, error } = await supabase.auth.getUser(accessToken);

	if (error || !data.user) {
		return { verified: false, email: null };
	}

	const isVerified = data.user.user_metadata?.email_verified || false;
	const email = data.user.email;

	return {
		verified: isVerified,
		email,
		userId: data.user.id
	};
};

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		throw redirect(303, '/login');
	}

	const { verified, email } = await getUserVerificationStatus(accessToken);

	console.log('User verification status:', { verified, email });

	if (verified) {
		throw redirect(303, '/dashboard');
	}

	return { email };
};
