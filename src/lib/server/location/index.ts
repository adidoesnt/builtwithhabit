import {
	LocationClient,
	SearchPlaceIndexForTextCommand,
	CalculateRouteCommand
} from '@aws-sdk/client-location';
import { env } from '$env/dynamic/private';

const MAX_DISTANCE_KM = Number(env.MAX_DISTANCE_KM);

const locationClient = new LocationClient({
	region: env.REGION
});

export const getCoordinatesFromPostalCode = async (postalCode: string) => {
	const command = new SearchPlaceIndexForTextCommand({
		IndexName: env.AWS_LOCATION_INDEX_NAME,
		Text: `${postalCode}, ${env.AWS_LOCATION_COUNTRY}`
	});

	const response = await locationClient.send(command);
	return response.Results?.[0]?.Place?.Geometry?.Point;
};

export const calculateDistance = async (
	startCoordinates: [number, number],
	endCoordinates: [number, number]
) => {
	try {
		const command = new CalculateRouteCommand({
			CalculatorName: env.AWS_LOCATION_CALCULATOR_NAME,
			DeparturePosition: startCoordinates,
			DestinationPosition: endCoordinates,
			TravelMode: 'Car'
		});

		const response = await locationClient.send(command);

		if (response.Summary) {
			return {
				distance: response.Summary.Distance,
				travelTimeInSeconds: response.Summary.DurationSeconds
			};
		}

		throw new Error('No driving route found between the specified coordinates');
	} catch (error) {
		console.error('Error calculating driving distance:', error);
		throw error;
	}
};

export const areCoordinatesNearby = async (
	startCoordinates: [number, number],
	endCoordinates: [number, number]
): Promise<boolean> => {
	try {
		const routeInfo = await calculateDistance(startCoordinates, endCoordinates);
		return routeInfo.distance !== undefined && routeInfo.distance <= MAX_DISTANCE_KM;
	} catch (error) {
		console.error('Error checking if coordinates are nearby:', error);
		return false;
	}
};

export const arePostalCodesNearby = async (
	postalCode1: string,
	postalCode2: string
): Promise<boolean> => {
	try {
		const coordinates1 = await getCoordinatesFromPostalCode(postalCode1);
		const coordinates2 = await getCoordinatesFromPostalCode(postalCode2);

		if (!coordinates1 || !coordinates2) {
			console.error('Could not find coordinates for one or both postal codes');
			return false;
		}

		return await areCoordinatesNearby(
			coordinates1 as [number, number],
			coordinates2 as [number, number]
		);
	} catch (error) {
		console.error('Error checking if postal codes are within driving distance:', error);
		return false;
	}
};

export const getPostalCodeDistanceAndTime = async (postalCode1: string, postalCode2: string) => {
	try {
		const coordinates1 = await getCoordinatesFromPostalCode(postalCode1);
		const coordinates2 = await getCoordinatesFromPostalCode(postalCode2);

		if (!coordinates1 || !coordinates2) {
			console.error('Could not find coordinates for one or both postal codes');
			return null;
		}

		const routeInfo = await calculateDistance(
			coordinates1 as [number, number],
			coordinates2 as [number, number]
		);

		if (routeInfo.distance === undefined || routeInfo.travelTimeInSeconds === undefined) {
			console.error('Invalid route information received');
			return null;
		}

		const hours = Math.floor(routeInfo.travelTimeInSeconds / 3600);
		const minutes = Math.floor((routeInfo.travelTimeInSeconds % 3600) / 60);

		return {
			distanceKm: routeInfo.distance,
			travelTimeInSeconds: routeInfo.travelTimeInSeconds,
			formattedDistance: `${routeInfo.distance.toFixed(1)} km`,
			formattedTravelTime: hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`
		};
	} catch (error) {
		console.error('Error calculating driving distance between postal codes:', error);
		return null;
	}
};

export const getAddressFromPostalCode = async (postalCode: string) => {
	if (!locationClient || !env.AWS_LOCATION_INDEX_NAME) {
		console.warn('AWS Location Service not properly configured');
		return null;
	}

	try {
		const command = new SearchPlaceIndexForTextCommand({
			IndexName: env.AWS_LOCATION_INDEX_NAME,
			Text: `${postalCode}, ${env.AWS_LOCATION_COUNTRY || 'Canada'}`
		});

		const response = await locationClient.send(command);
		const place = response.Results?.[0]?.Place;

		if (!place) {
			return null;
		}

		// Extract address components
		return {
			coordinates: place.Geometry?.Point,
			label: place.Label,
			municipality: place.Municipality,
			region: place.Region,
			country: place.Country,
			postalCode: place.PostalCode,
			neighborhood: place.Neighborhood,
			street: place.Street,
			subRegion: place.SubRegion
		};
	} catch (error) {
		console.error('Error getting address from postal code:', error);
		return null;
	}
};
