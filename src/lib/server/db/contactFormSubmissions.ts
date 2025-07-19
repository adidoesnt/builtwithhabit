import { contactFormSubmissions, type ContactFormSubmission } from './schema';
import { database } from '$lib/server/db';

export const createContactFormSubmission = async (submission: ContactFormSubmission) => {
	try {
		const result = await database.insert(contactFormSubmissions).values(submission).returning();

		if (result.length === 0) {
			throw new Error('Failed to create contact form submission');
		}

		return result[0];
	} catch (error) {
		console.error('Error creating contact form submission:', error);
	}
};
