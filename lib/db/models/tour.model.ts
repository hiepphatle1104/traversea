import { Document, model, models, Schema } from "mongoose";

export interface ITour extends Document {
	_id: string;
	title: string;
	location: { _id: string; name: string };
	category: string;
	imageUrl: string;
	price: number;
	seats: number;
	days: number;
	nights: number;
	descriptiom?: string;
	depart: { _id: string; name: string };
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	provider: { _id: string; username: string };
}

const tourModel = new Schema({
	// Type string
	title: {
		type: String,
		required: true,
	},
	description: String,
	category: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},

	// Type number
	days: {
		type: Number,
		required: true,
	},
	nights: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	seats: {
		type: Number,
		required: true,
	},

	// Type date
	startDate: {
		type: Date,
		default: Date.now,
	},
	endDate: {
		type: Date,
		default: Date.now,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},

	// ObjectId
	location: {
		type: Schema.Types.ObjectId,
		ref: "Location",
	},
	depart: {
		type: Schema.Types.ObjectId,
		ref: "Depart",
	},
	provider: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Tour = models.Tour || model("Tour", tourModel);

export default Tour;
