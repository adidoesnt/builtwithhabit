import { and, eq, gte } from 'drizzle-orm';
import { database } from '.';
import {
	availabilityOverrides,
	recurringAvailabilities,
	type AvailabilityOverride
} from './schema';

export const getTrainerAvailability = async (trainerId: string) => {
	const availability = await database.query.recurringAvailabilities.findMany({
		where: eq(recurringAvailabilities.trainerId, trainerId)
	});
	return availability;
};

export const getTrainerOverrides = async (trainerId: string, offset: Date = new Date()) => {
	const overrides = await database.query.availabilityOverrides.findMany({
		where: and(
			eq(availabilityOverrides.trainerId, trainerId),
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

export const upsertTrainerAvailability = async (
	trainerId: string,
	availabilities: AvailabilityUpsertAttributes[]
) => {
	await database
		.delete(recurringAvailabilities)
		.where(eq(recurringAvailabilities.trainerId, trainerId));

	await Promise.all(
		availabilities.map(async (availability) => {
			await Promise.all(
				availability.availabilities.map(async (timeSlot) => {
					await database.insert(recurringAvailabilities).values({
						trainerId,
						dayOfWeek: availability.day,
						start: timeSlot.start,
						end: timeSlot.end
					});
				})
			);
		})
	);
};

export const upsertTrainerOverrides = async (
	trainerId: string,
	overrides: AvailabilityOverride[]
) => {
	await database
		.delete(availabilityOverrides)
		.where(eq(availabilityOverrides.trainerId, trainerId));

	if (overrides.length === 0) return;

	const formattedOverrides = overrides.map((override) => ({
		trainerId,
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
