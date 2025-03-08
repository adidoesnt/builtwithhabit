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
