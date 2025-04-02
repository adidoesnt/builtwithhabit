import { database } from '.';
import { bookings, packages, purchases, PurchaseStatus } from '$lib/server/db/schema';
import { getDefaultTrainer } from './trainer';
import { and, asc, eq, gt } from 'drizzle-orm';

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

export const updatePaymentIntentClientSecret = async (
	purchaseId: number,
	paymentIntentClientSecret: string
) => {
	await database
		.update(purchases)
		.set({ paymentIntentClientSecret })
		.where(eq(purchases.id, purchaseId));
};

export const updatePurchaseStatus = async (
	paymentIntentClientSecret: string,
	status: PurchaseStatus
) => {
	try {
		console.log(
			'Attempting to update purchase status for client secret:',
			paymentIntentClientSecret
		);
		const result = await database
			.update(purchases)
			.set({ status })
			.where(eq(purchases.paymentIntentClientSecret, paymentIntentClientSecret))
			.returning();

		console.log('Update result:', result);

		if (!result || result.length === 0) {
			console.error('No purchase found for client secret:', paymentIntentClientSecret);
			throw new Error('No purchase found for the given client secret');
		}

		return result[0];
	} catch (error) {
		console.error('Error updating purchase status:', error);
		throw error;
	}
};

export const getPurchaseStatusByClientSecret = async (clientSecret: string) => {
	const result = await database
		.select()
		.from(purchases)
		.where(eq(purchases.paymentIntentClientSecret, clientSecret));
	const purchase = result[0];

	if (!purchase) {
		throw new Error('No purchase found for the given client secret');
	}

	return purchase.status;
};

export const getBookingsByUserId = async (userId: string) => {
	const results = await database
		.select()
		.from(bookings)
		.leftJoin(purchases, eq(bookings.purchaseId, purchases.id))
		.leftJoin(packages, eq(purchases.packageId, packages.id))
		.where(and(eq(purchases.userId, userId), eq(purchases.status, PurchaseStatus.CONFIRMED)))
		.orderBy(asc(bookings.start));

	return results.map((result) => ({
		...result.bookings,
		purchase: {
			id: result.purchases?.id,
			status: result.purchases?.status,
			address: result.purchases?.address,
			postalCode: result.purchases?.postalCode
		},
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
		.limit(limit);

	return result;
};
// For now we only have one trainer, so we can hardcode the trainerId
export const getAllBookings = async () => {
	const result = await database.select().from(bookings);
	// TODO: Filter by trainerId

	return result;
};
