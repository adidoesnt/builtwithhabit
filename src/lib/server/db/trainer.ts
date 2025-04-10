import { and, eq, gte } from 'drizzle-orm';
import { database } from '.';
import {
	availabilityOverrides,
	purchases,
	recurringAvailabilities,
	Role,
	userRoles,
	users,
	type AvailabilityOverride
} from './schema';

// For now we only have one trainer, so we can hardcode the trainerId
export const getTrainerAvailability = async () => {
	const trainer = await getDefaultTrainer();

	const availability = await database.query.recurringAvailabilities.findMany({
		where: eq(recurringAvailabilities.trainerId, trainer.id)
	});
	return availability;
};

// For now we only have one trainer, so we can hardcode the trainerId
export const getTrainerOverrides = async (offset: Date = new Date()) => {
	const trainer = await getDefaultTrainer();

	const overrides = await database.query.availabilityOverrides.findMany({
		where: and(
			eq(availabilityOverrides.trainerId, trainer.id),
			gte(availabilityOverrides.end, offset)
		)
	});
	return overrides;
};

type AvailabilityUpsertAttributes = {
	day: number;
	isAvailable: boolean;
	availabilities: {
		start: string;
		end: string;
	}[];
};

// For now we only have one trainer, so we can hardcode the trainerId
export const upsertTrainerAvailability = async (availabilities: AvailabilityUpsertAttributes[]) => {
	const trainer = await getDefaultTrainer();

	await database
		.delete(recurringAvailabilities)
		.where(eq(recurringAvailabilities.trainerId, trainer.id));

	await Promise.all(
		availabilities.map(async (availability) => {
			await Promise.all(
				availability.availabilities.map(async (timeSlot) => {
					await database.insert(recurringAvailabilities).values({
						trainerId: trainer.id,
						dayOfWeek: availability.day,
						start: timeSlot.start,
						end: timeSlot.end
					});
				})
			);
		})
	);
};

export const upsertTrainerOverrides = async (overrides: AvailabilityOverride[]) => {
	const trainer = await getDefaultTrainer();

	await database
		.delete(availabilityOverrides)
		.where(eq(availabilityOverrides.trainerId, trainer.id));

	if (overrides.length === 0) return;

	const formattedOverrides = overrides.map((override) => ({
		trainerId: trainer.id,
		start: new Date(override.start),
		end: new Date(override.end)
	}));

	await database
		.insert(availabilityOverrides)
		.values(formattedOverrides)
		.onConflictDoNothing({
			target: [
				availabilityOverrides.trainerId,
				availabilityOverrides.start,
				availabilityOverrides.end
			]
		});
};

export const getAllTrainers = async () => {
	const trainers = await database
		.select({
			id: users.id
		})
		.from(users)
		.leftJoin(userRoles, eq(users.id, userRoles.userId))
		.where(eq(userRoles.role, Role.TRAINER))
		.groupBy(users.id);
	return trainers;
};

export const getDefaultTrainer = async () => {
	const trainers = await getAllTrainers();
	return trainers[0];
};

// TODO: This is a temporary function to get the clients of the default trainer
export const getTrainerClients = async () => {
	const trainer = await getDefaultTrainer();

	const clients = await database
		.selectDistinct({
			id: users.id,
			firstName: users.firstName,
			lastName: users.lastName
		})
		.from(purchases)
		.leftJoin(users, eq(purchases.userId, users.id))
		.where(eq(purchases.trainerId, trainer.id));

	return clients;
};
