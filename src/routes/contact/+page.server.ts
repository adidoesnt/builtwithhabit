import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createContactFormSubmission } from '$lib/server/db/contactFormSubmissions';
import { sendContactFormEmail } from '$lib/server/email';

const schema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	subject: z.string().min(1, 'Subject is required'),
	message: z.string().min(1, 'Message is required')
});

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('Received contact form submission');

		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		console.log('Parsing form data:', data);
		const result = schema.safeParse(data);

		if (!result.success) {
			const errors = result.error.flatten().fieldErrors;
			console.error('Validation failed', errors);

			return fail(400, {
				errors,
				error: 'Invalid form data',
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					subject: data.subject,
					message: data.message
				}
			});
		}

		console.log('Validation successful', result.data);
		const { firstName, lastName, email, subject, message } = result.data;

		console.log('Received contact form submission:', {
			firstName,
			lastName,
			email,
			subject,
			message
		});

		const { success: emailSuccess, error: emailError } = await sendContactFormEmail({
			firstName,
			lastName,
			email,
			subject,
			message
		});

		// TODO: Discuss the SOP for handling failed emails
		const submission = await createContactFormSubmission({
			firstName,
			lastName,
			email,
			subject,
			message,
			emailSent: emailSuccess
		});
		const submissionSuccess = !!submission;

		const success = emailSuccess || submissionSuccess;
		const error = success ? null : emailError || 'Failed to create submission';

		return {
			success,
			error
		};
	}
};
