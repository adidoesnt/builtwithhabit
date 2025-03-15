import { eq } from 'drizzle-orm';
import { database } from '.';
import {
	availabilityOverrides,
	recurringAvailabilities,
	type RecurringAvailability
} from './schema';

export const getTrainerAvailability = async (trainerId: string) => {
	const availability = await database.query.recurringAvailabilities.findMany({
		where: eq(recurringAvailabilities.trainerId, trainerId)
	});
	return availability;
};

export const getTrainerOverrides = async (trainerId: string) => {
	const overrides = await database.query.availabilityOverrides.findMany({
		where: eq(availabilityOverrides.trainerId, trainerId)
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
