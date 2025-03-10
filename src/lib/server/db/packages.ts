import { eq } from 'drizzle-orm';
import { database } from '.';
import { packages } from './schema';

export const getAllPackages = async () => {
	return await database.select().from(packages);
};

export const getPackageById = async (id: number) => {
	return await database.query.packages.findFirst({
		where: eq(packages.id, id)
	});
};
