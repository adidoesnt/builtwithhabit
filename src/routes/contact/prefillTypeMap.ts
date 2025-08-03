import { ContactPrefillType } from '$lib/types';

export type PrefillTypeMap = {
	[key in ContactPrefillType]: {
		subject: string;
		content: string;
	};
};

export const prefillTypeMap = {
	[ContactPrefillType.ACTIVEWEAR]: {
		subject: 'builtwithhabit - activewear waitlist',
		content:
			"Hi, I'm interested in builtwithhabit's activewear and would like to be added to the waitlist."
	},
	[ContactPrefillType.TRAINING]: {
		subject: 'builtwithhabit - training consultation',
		content:
			"Hi, I'm interested in builtwithhabit's training services and would like to book a consultation."
	}
};
