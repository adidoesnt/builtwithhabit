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
	password: z.string().min(8, 'Password must be at least 8 characters long')
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
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
                    password: data.password
				}
			});
		}

		try {
            // TODO: use session object?
			const { user: authUser, session } = await signupWithEmail(
				result.data.email,
				result.data.password
			);

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
