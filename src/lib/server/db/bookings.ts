import { database } from '.';
import { bookings, packages, purchases, PurchaseStatus, users } from '$lib/server/db/schema';
import { getDefaultTrainer } from './trainer';
import { and, asc, desc, eq, gt, sql } from 'drizzle-orm';
import type { PaginationParams } from './types';
import { alias } from 'drizzle-orm/pg-core';

const getTimes = (slot: Date | string) => {
	const start = new Date(slot);
	const end = new Date(start.getTime() + 1 * 60 * 60 * 1000);
	return { start, end };
};

// For now we only have one trainer, so we can hardcode the trainerId
export const createUnconfirmedPurchase = async (
	userId: string,
	packageId: number,
	address: string,
	postalCode: string,
	slots: Array<Date>
) => {
	return await database.transaction(async (tx) => {
		const trainer = await getDefaultTrainer();

		const result = await tx
			.insert(purchases)
			.values({
				userId,
				packageId,
				trainerId: trainer.id,
				address,
				postalCode
			})
			.returning();

		const newPurchase = result[0];

		console.log('Created new unconfirmed purchase with id', newPurchase.id);

		await tx.insert(bookings).values(
			slots.map((slot) => {
				const { start, end } = getTimes(slot);
				return {
					purchaseId: newPurchase.id,
					userId,
					trainerId: trainer.id,
					start,
					end
				};
			})
		);

		console.log('Created bookings for purchase with id', newPurchase.id);

		return newPurchase;
	});
};

export const updatePaymentIntentId = async (purchaseId: number, paymentIntentId: string) => {
	await database.update(purchases).set({ paymentIntentId }).where(eq(purchases.id, purchaseId));
};

export const updatePurchaseStatus = async (paymentIntentId: string, status: PurchaseStatus) => {
	try {
		console.log('Attempting to update purchase status for client secret:', paymentIntentId);
		const result = await database
			.update(purchases)
			.set({ status })
			.where(eq(purchases.paymentIntentId, paymentIntentId))
			.returning();

		console.log('Update result:', result);

		if (!result || result.length === 0) {
			console.error('No purchase found for client secret:', paymentIntentId);
			throw new Error('No purchase found for the given client secret');
		}

		return result[0];
	} catch (error) {
		console.error('Error updating purchase status:', error);
		throw error;
	}
};

export const getPurchaseStatusByPaymentIntentId = async (paymentIntentId: string) => {
	const result = await database
		.select()
		.from(purchases)
		.where(eq(purchases.paymentIntentId, paymentIntentId));
	const purchase = result[0];

	if (!purchase) {
		throw new Error('No purchase found for the given payment intent id');
	}

	return purchase.status;
};

export const getBookingsByUserId = async (
	userId: string,
	paginationParams: PaginationParams = {
		page: 0,
		pageSize: 5
	}
) => {
	const totalCount = await database
		.select({ count: sql<number>`count(*)` })
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.where(and(eq(bookings.userId, userId), eq(purchases.status, PurchaseStatus.CONFIRMED)))
		.then((result) => result[0].count);

	const results = await database
		.select()
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.leftJoin(packages, eq(purchases.packageId, packages.id))
		.where(and(eq(bookings.userId, userId), eq(purchases.status, PurchaseStatus.CONFIRMED)))
		.orderBy(asc(bookings.start))
		.limit(paginationParams.pageSize)
		.offset(paginationParams.page * paginationParams.pageSize);

	const data = results.map((result) => ({
		...result.bookings,
		purchase: {
			id: result.purchases?.id,
			status: result.purchases?.status,
			address: result.purchases?.address,
			postalCode: result.purchases?.postalCode
		},
		package: result.packages
	}));

	return {
		items: data,
		total: Number(totalCount),
		page: paginationParams.page,
		pageSize: paginationParams.pageSize
	};
};

// For now we only have one trainer, so we can hardcode the trainerId
export const getBookingsForTrainer = async (
	paginationParams: PaginationParams = {
		page: 0,
		pageSize: 5
	}
) => {
	// TODO: Filter by trainerId

	const totalCount = await database
		.select({ count: sql<number>`count(*)` })
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.where(eq(purchases.status, PurchaseStatus.CONFIRMED))
		.then((result) => result[0].count);

	const results = await database
		.select()
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.leftJoin(packages, eq(purchases.packageId, packages.id))
		.leftJoin(users, eq(purchases.userId, users.id))
		.where(eq(purchases.status, PurchaseStatus.CONFIRMED))
		.orderBy(asc(bookings.start))
		.limit(paginationParams.pageSize)
		.offset(paginationParams.page * paginationParams.pageSize);

	const data = results.map((result) => ({
		...result.bookings,
		purchase: {
			id: result.purchases?.id,
			status: result.purchases?.status,
			address: result.purchases?.address,
			postalCode: result.purchases?.postalCode
		},
		user: {
			id: result.users?.id,
			firstName: result.users?.firstName,
			lastName: result.users?.lastName,
			email: result.users?.email
		},
		package: result.packages
	}));

	return {
		items: data,
		total: totalCount,
		page: paginationParams.page,
		pageSize: paginationParams.pageSize
	};
};

export const getPurchasesByUserId = async (userId: string) => {
	const results = await database
		.select()
		.from(purchases)
		.leftJoin(packages, eq(purchases.packageId, packages.id))
		.where(eq(purchases.userId, userId))
		.orderBy(desc(purchases.createdAt));

	return results.map((result) => ({
		...result.purchases,
		package: result.packages
	}));
};

export const getUpcomingBookingsByUserId = async (userId: string, limit = 3) => {
	// Limit to top 3
	const result = await database
		.select({
			id: bookings.id,
			start: bookings.start,
			end: bookings.end,
			purchase: {
				id: purchases.id,
				address: purchases.address,
				postalCode: purchases.postalCode
			}
		})
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.where(and(eq(bookings.userId, userId), gt(bookings.start, new Date())))
		.orderBy(asc(bookings.start))
		.limit(limit);

	return result;
};

// For now we only have one trainer, so we can hardcode the trainerId
export const getUpcomingBookingsForTrainer = async (limit = 3) => {
	// Limit to top 3
	const result = await database
		.select({
			id: bookings.id,
			start: bookings.start,
			end: bookings.end,
			purchase: {
				id: purchases.id,
				address: purchases.address,
				postalCode: purchases.postalCode
			},
			user: {
				id: users.id,
				firstName: users.firstName,
				lastName: users.lastName
			}
		})
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.leftJoin(users, eq(purchases.userId, users.id))
		.where(gt(bookings.start, new Date()))
		.limit(limit);

	return result;
};

// For now we only have one trainer, so we can hardcode the trainerId
export const getAllBookings = async () => {
	const result = await database.select().from(bookings);
	// TODO: Filter by trainerId

	return result;
};

export const deleteBookingsByPaymentIntentId = async (paymentIntentId: string) => {
	const purchase = await database.query.purchases.findFirst({
		where: eq(purchases.paymentIntentId, paymentIntentId)
	});

	if (!purchase) {
		throw new Error('No purchase found for the given payment intent id');
	}

	const result = await database.delete(bookings).where(eq(bookings.purchaseId, purchase.id));

	return result;
};

export const getRecentPurchasesByUserId = async (userId: string, limit = 3) => {
	const result = await database
		.select()
		.from(purchases)
		.leftJoin(packages, eq(purchases.packageId, packages.id))
		.where(eq(purchases.userId, userId))
		.limit(limit);

	return result;
};

export const getBookingById = async (id: number) => {
	const clients = alias(users, 'clients');
	const trainers = alias(users, 'trainers');

	const result = await database
		.select({
			id: bookings.id,
			start: bookings.start,
			end: bookings.end,
			notes: bookings.notes,
			purchase: {
				id: purchases.id,
				address: purchases.address,
				postalCode: purchases.postalCode
			},
			package: {
				id: packages.id,
				name: packages.name,
				description: packages.description,
				price: packages.price
			},
			client: {
				id: clients.id,
				firstName: clients.firstName,
				lastName: clients.lastName,
				email: clients.email
			},
			trainer: {
				id: trainers.id,
				firstName: trainers.firstName,
				lastName: trainers.lastName,
				email: trainers.email
			}
		})
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.leftJoin(packages, eq(purchases.packageId, packages.id))
		.leftJoin(clients, eq(purchases.userId, clients.id))
		.leftJoin(trainers, eq(purchases.trainerId, trainers.id))
		.where(eq(bookings.id, id));

	const booking = result[0];

	if (!booking) {
		throw new Error('Booking not found');
	}

	return booking;
};
