"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../db";
import User from "../db/models/user.model";
import { handleError } from "../utils";

// Get user by clerk id
export const getUser = async (clerkId: string) => {
	try {
		await connectToDatabase();
		const user = await User.findOne({ clerkId: clerkId });

		// if (!user) {
		// 	throw new Error("User not found");
		// }

		return JSON.parse(JSON.stringify(user));
	} catch (error) {
		handleError(error);
	}
};

// Get user by id
export const getUserById = async (userId: string) => {
	try {
		await connectToDatabase();
		const user = await User.findById(userId);

		return JSON.parse(JSON.stringify(user));
	} catch (error) {
		handleError(error);
	}
};

// Create new user
export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		const newUser = await User.create(user);

		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		handleError(error);
	}
};

// Update user
export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
	try {
		await connectToDatabase();

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

// Delete user
export const deleteUser = async (clerkId: string) => {
	try {
		await connectToDatabase();

		const userToDelete = await User.findOne({ clerkId });

		if (!userToDelete) throw new Error("User not found");

		// Need to fix

		return;
	} catch (error) {
		handleError(error);
	}
};
