import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    middleName: text('middle_name'),
    lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull()
});
