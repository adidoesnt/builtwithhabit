import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getUserById } from '$lib/server/db/user';
import { loginWithEmail } from '$lib/server/auth/email/login';

const schema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string(),
});

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

        console.log('Logging in', {
            email: data.email,
        });

		const result = schema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid form data',
				errors: result.error.flatten().fieldErrors,
				data: {
					email: data.email,
					password: data.password
				}
			});
		}

		try {
			const {
				user: authUser,
				session,
				weakPassword
			} = await loginWithEmail(result.data.email, result.data.password);

			if (!authUser) {
				throw new Error('Failed to create user');
			}

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

			if (weakPassword) {
				fail(400, {
					error: 'Weak password',
					errors: {
						password: weakPassword.reasons?.[0] ?? 'Weak password'
					},
					data: {
						email: data.email,
						password: data.password
					}
				});
			}

			const user = await getUserById(authUser.id);

            console.log('Logged in successfully', {
                user,
                session
            })

			return {
				success: true,
				user
			};
		} catch (error) {
			console.error(error);

			return fail(500, {
				error: (error as Error).message ?? 'Failed to login',
				errors: {},
				data: {
					email: data.email,
					password: data.password
				}
			});
		}
	}
} satisfies Actions;
