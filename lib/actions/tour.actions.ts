"use server";

import { CreateTourParams, UpdateTourParams } from "@/types";
import { connectToDatabase } from "../db";
import Tour from "../db/models/tour.model";
import User from "../db/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Location from "../db/models/location.model";
import Depart from "../db/models/depart.model";

export const getTourByName = async (search: string) => {
	try {
		await connectToDatabase();

		const tours = await Tour.find({
			title: { $regex: search, $options: "i" },
		}).populate("location");

		return JSON.parse(JSON.stringify(tours));
	} catch (error) {
		handleError(error);
	}
};

// Get all tour
export const getAllTour = async () => {
	try {
		await connectToDatabase();
		const allTours = await Tour.find().populate("location");

		return JSON.parse(JSON.stringify(allTours));
	} catch (error) {
		console.log(error);
	}
};

// Get tour by id
export const getTourById = async (tourId: string) => {
	try {
		await connectToDatabase();

		const tour = await Tour.findById(tourId)
			.populate("depart")
			.populate("location");

		return JSON.parse(JSON.stringify(tour));
	} catch (error) {
		handleError(error);
	}
};

// Get tour by userid
export const getTourByUserId = async (userId: string) => {
	try {
		await connectToDatabase();

		const user = await User.findOne({ clerkId: userId });

		if (!user) throw new Error("User not found");

		const tour = await Tour.find({ provider: user._id }).populate("provider");

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
		const location = await Location.findById(tour.locationId);
		const depart = await Depart.findById(tour.departId);

		if (!user) return new Error("User not found");

		if (!location) return new Error("Location not found");

		if (!depart) return new Error("Departure location not found");

		const newTour = await Tour.create({
			...tour,
			location: location,
			depart: depart,
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
}: UpdateTourParams) => {
	try {
		await connectToDatabase();

		const tourToUpdate = await Tour.findById(tourId);
		const location = await Location.findById(tour.locationId);
		const depart = await Depart.findById(tour.departId);

		if (!tourToUpdate) throw new Error("Tour not found");

		if (tourToUpdate.provider.toString() !== userId)
			throw new Error("Unauthorized");

		const updatedTour = await Tour.findByIdAndUpdate(
			tourId,
			{
				...tour,
				location: location._id,
				depart: depart._id,
			},
			{ new: true }
		);

		return JSON.parse(JSON.stringify(updatedTour));
	} catch (error) {
		handleError(error);
	}
};
