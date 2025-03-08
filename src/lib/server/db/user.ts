import { eq } from 'drizzle-orm';
import { database } from '.';
import { users } from './schema';

import type { UserCreateAttributes } from './schema';

export const createUser = async (attributes: UserCreateAttributes) => {
	const result = await database.insert(users).values(attributes).returning();

	if (!result) {
		throw new Error('Failed to create user');
	}

	const user = result[0];
	return user;
};

export const getUserById = async (id: string) => {
	const result = await database.select().from(users).where(eq(users.id, id));

	if (!result) {
		throw new Error('Failed to get user');
	}

	const user = result[0];
	return user;
};
