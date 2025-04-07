import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendPasswordResetEmail } from '$lib/server/auth/email/resetPassword';

const schema = z.object({
	email: z.string().email('Invalid email address')
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		console.log('Logging in', {
			email: data.email
		});

		const result = schema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid form data',
				errors: result.error.flatten().fieldErrors,
				data: {
					email: data.email
				}
			});
		}

		try {
			await sendPasswordResetEmail(result.data.email);
			return {
				success:
					"Password reset email sent. Please check your spam folder if you don't see it in your inbox."
			};
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: 'Failed to reset password'
			});
		}
	}
} satisfies Actions;
