import { database } from '.';
import { bookings, purchases } from '$lib/server/db/schema';
import { getDefaultTrainer } from './trainer';
import { eq } from 'drizzle-orm';

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
