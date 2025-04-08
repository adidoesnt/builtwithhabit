import config from '$lib/config';

const { pricing } = config.site;

export const adjustPrice = (price: string, discount: string | null) => {
	const priceNumber = parseFloat(price);
	const discountNumber = parseFloat(discount ?? '0.00');
	const adjustedPrice = priceNumber - discountNumber;
	return `${pricing.currency} ${adjustedPrice.toFixed(2)}`;
};

export const formatSessions = (sessions: number) => {
	return sessions === 1 ? '1 session' : `${sessions} sessions`;
};
