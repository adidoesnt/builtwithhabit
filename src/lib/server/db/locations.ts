import { arePostalCodesNearby, getAddressFromPostalCode } from '$lib/server/location';
import { database } from '.';

export const getLocations = async () => {
	const locations = await database.query.locations.findMany();
	return locations;
};

export const isValidLocation = async (postalCode: string) => {
	const locations = await getLocations();

	const resolutions = await Promise.all(
		locations.map(async (location) => {
			return await arePostalCodesNearby(postalCode, location.postalCode);
		})
	);

	const isValid = resolutions.some((nearby) => nearby);
	const address = await getAddressFromPostalCode(postalCode);

	return { isValid, address };
};
