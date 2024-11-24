"use server";

import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { CreateUserParams, UpdateUserParams } from "../types";
import { handleError } from "../utils";

export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		// Create a new user
		const newUser = await User.create(user);

		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		handleError(error);
	}
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
	try {
		await connectToDatabase();

		// Update the user
		const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
			new: true,
		});

		if (!updatedUser) {
			throw new Error("User update failed");
		}

		return JSON.parse(JSON.stringify(updatedUser));
	} catch (error) {
		handleError(error);
	}
};

export const deletedUser = async (clerkId: string) => {
	try {
		await connectToDatabase();

		// Delete the user
		const userNeedToDelete = await User.findOne({ clerkId });

		if (!userNeedToDelete) {
			throw new Error("User not found");
		}
	} catch (error) {
		handleError(error);
	}
};
