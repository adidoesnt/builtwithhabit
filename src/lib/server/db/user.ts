import { eq, sql } from 'drizzle-orm';
import { database } from '.';
import { Role, userRoles, users, type UserCreateAttributes } from './schema';
import type { PaginationParams } from './types';

export type UserWithRoles = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
	roles: Role[];
};

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

export const getAllUsers = async (
	paginationParams: PaginationParams = {
		page: 0,
		pageSize: 5
	},
	search: string = ''
) => {
	const searchCondition = search
		? sql`(${users.firstName} ILIKE ${`%${search}%`} OR ${users.lastName} ILIKE ${`%${search}%`} OR ${users.email} ILIKE ${`%${search}%`})`
		: undefined;

	const totalCount = await database
		.select({ count: sql<number>`count(*)` })
		.from(users)
		.leftJoin(userRoles, eq(users.id, userRoles.userId))
		.where(searchCondition)
		.then((result) => result[0].count);

	const data = await database
		.select({
			id: users.id,
			firstName: users.firstName,
			lastName: users.lastName,
			email: users.email,
			createdAt: users.createdAt,
			roles: sql<string[]>`COALESCE(array_agg(${userRoles.role}::text), ARRAY[]::text[])`
		})
		.from(users)
		.leftJoin(userRoles, eq(users.id, userRoles.userId))
		.where(searchCondition)
		.groupBy(users.id)
		.limit(paginationParams.pageSize)
		.offset(paginationParams.page * paginationParams.pageSize);

	return {
		items: data.map((user) => ({
			...user,
			roles: user.roles as Role[]
		})),
		page: paginationParams.page,
		pageSize: paginationParams.pageSize,
		total: totalCount
	};
};

export const updateUser = async (
	id: string,
	attributes: UserCreateAttributes & { roles: Role[] }
) => {
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
