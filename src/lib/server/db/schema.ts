import { pgEnum, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export enum Role {
	ADMIN = 'admin',
	USER = 'user'
}

const roleEnum = pgEnum('role', [Role.ADMIN, Role.USER]);

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	middleName: text('middle_name'),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const roles = pgTable('roles', {
	id: serial('id').primaryKey(),
	name: roleEnum('name').notNull().default(Role.USER),
	description: text('description'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const userRoles = pgTable(
	'user_roles',
	{
		userId: serial('user_id').references(() => users.id),
		roleId: serial('role_id').references(() => roles.id)
	},
	(table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);
