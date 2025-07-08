import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getUserById } from '$lib/server/db/user';
import { loginWithEmail } from '$lib/server/auth/email/login';
import { setUser } from '../../../lib/stores/auth';

const schema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string()
});

export const actions = {
	default: async ({ request, cookies }) => {
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
					email: data.email,
					password: data.password
				}
			});
		}

		const loginResult = await loginWithEmail(result.data.email, result.data.password);
		console.log('Login result', loginResult);

		if (loginResult.error || !loginResult.user || !loginResult.session) {
			return fail(400, {
				error: 'Failed to log in',
				errors: {
					password: loginResult.error || 'Invalid credentials'
				},
				data: {
					email: data.email,
					password: data.password
				}
			});
		}

		const { user: authUser, session } = loginResult;

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

		const user = await getUserById(authUser.id);
		setUser(user);

		console.log('Logged in successfully', {
			user,
			session
		});

		throw redirect(303, '/training/dashboard');
	}
} satisfies Actions;
