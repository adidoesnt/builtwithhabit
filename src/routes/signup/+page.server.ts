import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signupWithEmail } from '$lib/server/auth/email/signup';
import { createUser } from '$lib/server/db/user';
import { setUser } from '../../stores/auth';

const schema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	middleName: z.string().optional(),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters long')
});

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = schema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid form data',
				errors: result.error.flatten().fieldErrors,
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
                    password: data.password
				}
			});
		}

		try {
			const { user: authUser, session } = await signupWithEmail(
				result.data.email,
				result.data.password
			);

			if (!authUser) {
				throw new Error('Failed to create user');
			}

			if (session) {
				cookies.set('access_token', session.access_token, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					maxAge: session.expires_in
				});

				cookies.set('refresh_token', session.refresh_token, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					maxAge: 60 * 60 * 24 * 30 // Default Supabase refresh token expiry
				});
			}

			const user = await createUser({
				firstName: result.data.firstName,
				lastName: result.data.lastName,
				email: result.data.email,
				id: authUser.id
			});
			setUser(user);

			return {
				success: true,
				user
			};
		} catch (error) {
			console.error(error);

			return fail(500, {
				error: 'Failed to signup',
				errors: {},
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
                    password: data.password
				}
			});
		}
	}
} satisfies Actions;
