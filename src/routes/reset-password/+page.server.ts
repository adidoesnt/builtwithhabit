import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { resetPassword } from '$lib/server/auth/email/resetPassword';
import { supabase } from '$lib/server/auth';

const schema = z.object({
	password: z.string().min(8, 'Password must be at least 8 characters long')
});

export const actions = {
	default: async ({ request, url }) => {
		const hash = url.hash.substring(1);
		const params = new URLSearchParams(hash);
		const accessToken = params.get('access_token');

		if (!accessToken) {
			return fail(403, {
				error: 'Invalid access token'
			});
		}

		const { data: userData, error } = await supabase.auth.getUser(accessToken);

		if (error) {
			return fail(403, {
				error: 'Invalid access token'
			});
		}

		const email = userData.user?.email;

		if (!email) {
			return fail(403, {
				error: 'Invalid access token'
			});
		}

		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		console.log('Resetting password', {
			email,
			password: data.password
		});

		const result = schema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid form data',
				errors: result.error.flatten().fieldErrors,
				data: {
					password: data.password
				}
			});
		}

		try {
			await resetPassword(email, result.data.password);
			return {
				success: 'Password reset successfully'
			};
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: 'Failed to reset password'
			});
		}
	}
} satisfies Actions;
