import { decimal, pgTable, serial, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';

export type UserCreateAttributes = typeof users.$inferInsert;
export type UserFindAttributes = typeof users.$inferSelect;

/**
 * Users table - stores user account information
 *
 * Contains basic user profile information including name and email
 * Used for authentication and identification throughout the application
 */
export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	middleName: text('middle_name'),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export type Package = typeof packages.$inferSelect;

/**
 * Packages table - stores available service packages
 *
 * Defines the different packages that users can purchase
 * Includes details like number of sessions, validity period, and pricing
 */
export const packages = pgTable('packages', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	sessions: integer('sessions').notNull(),
	expiryInDays: integer('expiry_in_days').notNull(),
	description: text('description').notNull(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	discount: decimal('discount', { precision: 10, scale: 2 }).default('0.00')
});

/**
 * Purchases table - tracks package purchases by users
 *
 * Records when a user buys a specific package
 * Links users to their purchased packages and serves as a reference for bookings
 */
export const purchases = pgTable('purchases', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => users.id)
		.notNull(),
	packageId: integer('package_id')
		.references(() => packages.id)
		.notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export type Location = typeof locations.$inferSelect;

export const locations = pgTable('locations', {
	id: serial('id').primaryKey(),
	address: text('address').notNull(),
	postalCode: text('postal_code').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

/**
 * Bookings table - represents individual sessions from purchased packages
 *
 * Each booking corresponds to a single session that a user schedules
 * from their purchased package allocation
 * Contains start and end times for the session and links to the user and purchase
 * Location will be used to check distance from available locations
 */
export const bookings = pgTable('bookings', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => users.id)
		.notNull(),
	purchaseId: integer('purchase_id')
		.references(() => purchases.id)
		.notNull(),
	start: timestamp('start').notNull(),
	end: timestamp('end').notNull(),
	address: text('address').notNull(),
	postalCode: text('postal_code').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
