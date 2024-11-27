"use server";

import { CreateTourParams, UpdateTourParams } from "@/types";
import { connectToDatabase } from "../db";
import Tour, { ITour } from "../db/models/tour.model";
import User from "../db/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

// Get all tour
export const getAllTour = async () => {
	try {
		await connectToDatabase();
		const allTours = await Tour.find();

		return JSON.parse(JSON.stringify(allTours));
	} catch (error) {
		handleError(error);
	}
};

// Get tour by id
export const getTourById = async (tourId: string) => {
	try {
		await connectToDatabase();

		const tour = await Tour.findById(tourId);

		return JSON.parse(JSON.stringify(tour));
	} catch (error) {
		handleError(error);
	}
};

// Get tour by userid
export const getTourByUserId = async (userId: string) => {
	try {
		await connectToDatabase();

		const tour = await Tour.find({ provider: userId });

		if (!tour) throw new Error("Tour not found");

		return JSON.parse(JSON.stringify(tour));
	} catch (error) {
		handleError(error);
	}
};

// Create new tour
export const createTour = async ({ userId, tour, path }: CreateTourParams) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user) throw new Error("User not found");

		const newTour = await Tour.create({
			...tour,
			location: tour.locationId,
			depart: tour.departId,
			provider: userId,
		});

		revalidatePath(path);

		return JSON.parse(JSON.stringify(newTour));
	} catch (error) {
		handleError(error);
	}
};

// Update tour
export const updateTour = async ({
	userId,
	tour,
	tourId,
	path,
}: UpdateTourParams) => {
	try {
		await connectToDatabase();

		const tourToUpdate = await Tour.findById(tourId);

		if (!tourToUpdate) throw new Error("Tour not found");

		if (tourToUpdate.provider.toString() !== userId)
			throw new Error("Unauthorized");

		const updatedTour = await Tour.findByIdAndUpdate(
			tourId,
			{
				...tour,
				location: tour.locationId,
				depart: tour.departId,
			},
			{ new: true }
		);
		revalidatePath(path);

		return JSON.parse(JSON.stringify(updatedTour));
	} catch (error) {
		handleError(error);
	}
};
