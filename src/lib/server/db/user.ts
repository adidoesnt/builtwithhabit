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

export const getAllUsers = async () => {
	const users = await database.query.users.findMany();
	const usersWithRoles = await Promise.all(
		users.map(async (user) => {
			const roles = await database.query.userRoles.findMany({
				where: eq(userRoles.userId, user.id)
			});

			return {
				...user,
				roles: roles.map((role) => role.role)
			};
		})
	);

	return usersWithRoles;
};

export const updateUser = async (id: string, attributes: UserCreateAttributes & { roles: Role[] }) => {
	const user = await database.transaction(async (tx) => {
		const result = await tx.update(users).set(attributes).where(eq(users.id, id)).returning();

		if (!result) {
			throw new Error('Failed to update user');
		}

		await tx.delete(userRoles).where(eq(userRoles.userId, id));
		await tx.insert(userRoles).values(attributes.roles.map((role) => ({ userId: id, role })));

		return result[0];
	});

	return user;
};

export const deleteUser = async (id: string) => {
	const result = await database.delete(users).where(eq(users.id, id));
	const deleteCount = result.length;

	return deleteCount;
};
