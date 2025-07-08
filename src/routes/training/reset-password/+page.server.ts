import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { resetPassword } from '$lib/server/auth/email/resetPassword';
import { supabase } from '$lib/server/auth';

const schema = z.object({
	password: z.string().min(8, 'Password must be at least 8 characters long'),
	access_token: z.string(),
	refresh_token: z.string()
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		console.log('Resetting password');

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
			const { error: sessionError } = await supabase.auth.setSession({
				access_token: result.data.access_token,
				refresh_token: result.data.refresh_token
			});

			if (sessionError) {
				console.error('Session error:', sessionError);
				return fail(500, {
					error: 'Failed to establish session'
				});
			}

			const resetResult = await resetPassword(result.data.password);
			if (!resetResult) {
				return fail(500, {
					error: 'Failed to reset password'
				});
			}

			return {
				success: true,
				message: 'Password reset successfully!',
				location: '/training/login'
			};
		} catch (error) {
			console.error('Error resetting password:', error);
			return fail(500, {
				error: 'Failed to reset password'
			});
		}
	}
} satisfies Actions;
