export type PurchaseWithPackage = {
	id: number;
	name: string;
	sessions: number;
	expiryInDays: number;
	description: string;
	price: string;
	discount: string | null;
};
