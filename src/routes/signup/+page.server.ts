import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signupWithEmail } from '$lib/server/auth/email/signup';
import { createUser } from '$lib/server/db/user';

const schema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	middleName: z.string().optional(),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = schema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid form data',
				errors: result.error.flatten().fieldErrors,
				data: {
					username: data.username,
					rememberMe: formData.has('remember-me')
				}
			});
		}

		try {
			const { user: authUser, session } = await signupWithEmail(result.data.email, result.data.password);

			if (!authUser) {
				throw new Error('Failed to create user');
			}

			const user = await createUser({
				firstName: result.data.firstName,
				lastName: result.data.lastName,
				email: result.data.email,
				id: authUser.id
			});

			return {
				success: true,
                user,
			};
		} catch (error) {
			console.error(error);

			return fail(500, {
				error: 'Failed to login',
				errors: {
					username: 'Invalid username or password',
					password: 'Invalid username or password'
				},
				data: {
					username: data.username,
					rememberMe: formData.has('remember-me')
				}
			});
		}
	}
} satisfies Actions;
