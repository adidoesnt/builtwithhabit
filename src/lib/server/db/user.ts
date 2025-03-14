import { eq } from 'drizzle-orm';
import { database } from '.';
import { Role, userRoles, users, type UserCreateAttributes } from './schema';

export const createUser = async (attributes: UserCreateAttributes) => {
	const user = await database.transaction(async (tx) => {
		const result = await tx.insert(users).values(attributes).returning();

		if (!result) {
			throw new Error('Failed to create user');
		}

		const user = result[0];

		await tx.insert(userRoles).values({
			userId: user.id,
			role: Role.USER
		});

		return user;
	});

	const createdUser = await database.query.users.findFirst({
		where: eq(users.id, user.id)
	});
	const createdUserRoles = await database.query.userRoles.findMany({
		where: eq(userRoles.userId, user.id)
	});

	return {
		...createdUser,
		roles: createdUserRoles.map((role) => role.role)
	};
};
export const getUserById = async (id: string) => {
	const user = await database.query.users.findFirst({
		where: eq(users.id, id)
	});
	const roles = await database.query.userRoles.findMany({
		where: eq(userRoles.userId, id)
	});

	if (!user) {
		throw new Error('Failed to get user');
	}

	return {
		...user,
		roles: roles.map((role) => role.role)
	};
};
