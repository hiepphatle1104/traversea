import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const catched = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
	if (catched.conn) {
		return catched.conn;
	}

	if (!MONGODB_URI) {
		throw new Error(
			"Please define the MONGODB_URI environment variable in .env.local"
		);
	}

	catched.promise =
		catched.promise ||
		mongoose.connect(MONGODB_URI, {
			dbName: "traverseaDB",
			bufferCommands: false,
		});

	catched.conn = await catched.promise;

	return catched.conn;
}
