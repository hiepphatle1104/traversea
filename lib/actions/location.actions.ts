"use server";

import { connectToDatabase } from "../db";
import Location from "../db/models/location.model";
import { handleError } from "../utils";

// Get all lcation
export const getAllLocation = async () => {
	try {
		await connectToDatabase();

		const allLocations = await Location.find();

		return JSON.parse(JSON.stringify(allLocations));
	} catch (error) {
		handleError(error);
	}
};

// Create new location
export const createLocation = async (locationName: string) => {
	try {
		await connectToDatabase();

		const newLocation = await Location.create({ name: locationName });

		return JSON.parse(JSON.stringify(newLocation));
	} catch (error) {
		handleError(error);
	}
};
