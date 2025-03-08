import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export type UserCreateAttributes = typeof users.$inferInsert;

export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	middleName: text('middle_name'),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
});
