export type TrainerAvailability = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	trainerId: string;
	start: string;
	end: string;
	dayOfWeek: number;
};

export type TrainerOverride = {
	createdAt: Date;
	updatedAt: Date;
	trainerId: string;
	start: Date;
	end: Date;
};
