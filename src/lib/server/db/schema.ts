import {
	decimal,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
	integer,
	pgEnum,
	primaryKey
} from 'drizzle-orm/pg-core';

export type UserCreateAttributes = typeof users.$inferInsert;
export type UserFindAttributes = typeof users.$inferSelect;

export enum Role {
	ADMIN = 'admin',
	TRAINER = 'trainer',
	USER = 'user'
}

export const rolesEnum = pgEnum('roles', [Role.ADMIN, Role.TRAINER, Role.USER]);

/**
 * Users table - stores user account information
 *
 * Contains basic user profile information including name and email
 * Used for authentication and identification throughout the application
 */
export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

/**
 * User roles table - stores user roles
 *
 * Links users to their roles
 */
export const userRoles = pgTable(
	'user_roles',
	{
		userId: uuid('user_id')
			.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		role: rolesEnum('role').notNull()
	},
	(table) => [
		primaryKey({
			columns: [table.userId, table.role]
		})
	]
);

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

export enum PurchaseStatus {
	CONFIRMED = 'confirmed',
	UNCONFIRMED = 'unconfirmed',
	FAILED = 'failed'
}

export const purchaseStatusEnum = pgEnum('purchase_status', [
	PurchaseStatus.CONFIRMED,
	PurchaseStatus.UNCONFIRMED,
	PurchaseStatus.FAILED
]);

/**
 * Purchases table - tracks package purchases by users
 *
 * Records when a user buys a specific package
 * Links users to their purchased packages and serves as a reference for bookings
 */
export const purchases = pgTable('purchases', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	packageId: integer('package_id')
		.references(() => packages.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	trainerId: uuid('trainer_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	address: text('address').notNull(),
	postalCode: text('postal_code').notNull(),
	status: purchaseStatusEnum('status').notNull().default(PurchaseStatus.UNCONFIRMED),
	paymentIntentId: text('payment_intent_id'),
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
export type Booking = typeof bookings.$inferSelect;

export const bookings = pgTable('bookings', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	purchaseId: integer('purchase_id')
		.references(() => purchases.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	start: timestamp('start').notNull(),
	end: timestamp('end').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

/**
 * Weekly schedules table - stores trainer availability
 *
 * Each schedule represents a trainer's availability for a specific day of the week
 * Contains start and end times for the availability and links to the trainer
 */
export type RecurringAvailability = typeof recurringAvailabilities.$inferSelect;

export const recurringAvailabilities = pgTable('recurring_availabilities', {
	id: serial('id').primaryKey(),
	trainerId: uuid('trainer_id')
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
		.notNull(),
	dayOfWeek: integer('day_of_week').notNull(), // 0 = Sunday, 1 = Monday, etc.
	start: text('start').notNull(),
	end: text('end').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export type AvailabilityOverride = typeof availabilityOverrides.$inferInsert;

export const availabilityOverrides = pgTable(
	'availability_overrides',
	{
		trainerId: uuid('trainer_id')
			.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		start: timestamp('start').notNull(),
		end: timestamp('end').notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => [
		primaryKey({
			columns: [table.trainerId, table.start, table.end]
		})
	]
);
