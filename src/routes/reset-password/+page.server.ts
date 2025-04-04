import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { supabase } from '$lib/server/auth';
import { resetPassword } from '$lib/server/auth/email/resetPassword';

const schema = z.object({
	password: z.string()
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

		// const { data: userData, error } = await supabase.auth.getUser(accessToken);

		// if (error) {
		// 	return fail(403, {
		// 		error: 'Invalid access token'
		// 	});
		// }

		// const email = userData.user?.email;

		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		console.log('Resetting password', {
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
			await resetPassword(result.data.password);
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: 'Failed to reset password'
			});
		}

		throw redirect(303, '/login');
	}
} satisfies Actions;
