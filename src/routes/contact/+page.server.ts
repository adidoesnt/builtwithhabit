import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const schema = z.object({
	first_name: z.string().min(1, 'First name is required'),
	last_name: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	subject: z.string().min(1, 'Subject is required'),
	message: z.string().min(1, 'Message is required')
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = schema.safeParse(data);

        if (!result.success) {
            return fail(400, {
                errors: result.error.flatten().fieldErrors,
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message
                }
            });
        }

        const { first_name, last_name, email, subject, message } = result.data;

        console.log('Received contact form submission:', {
            first_name,
            last_name,
            email,
            subject,
            message
        });

        // TODO: send email with nodemailer, use SMTP credentials from Supabase
        // TODO: persist form submission to Supabase table

        return {
            success: true
        };
	}
};