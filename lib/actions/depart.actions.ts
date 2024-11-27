"use server";

import { connectToDatabase } from "../db";
import Depart from "../db/models/depart.model";
import { handleError } from "../utils";

// Get all depart
export const getAllDepart = async () => {
	try {
		await connectToDatabase();

		const allDeparts = await Depart.find();

		return JSON.parse(JSON.stringify(allDeparts));
	} catch (error) {
		handleError(error);
	}
};

// Create new depart
export const createDepart = async (departName: string) => {
	try {
		await connectToDatabase();

		const newDepart = await Depart.create({ name: departName });

		return JSON.parse(JSON.stringify(newDepart));
	} catch (error) {
		handleError(error);
	}
};

export const getDepartById = async (departId: string) => {
	try {
		await connectToDatabase();

		const depart = await Depart.findById(departId);

		return JSON.parse(JSON.stringify(depart));
	} catch (error) {
		handleError(error);
	}
};
