import { Document, model, models, Schema } from "mongoose";

export interface ITour extends Document {
	_id: String;
	title: String;
	description?: String;
	destinations: [{ _id: String; name: String }];
	price?: String;
	duration?: String;
	url?: String;
	imageUrl: String;
	createdAt: Date;
	startDateTime: Date;
	endDateTime: Date;
	organizer: { _id: String; firstName: String; lastName: String };
	category: { _id: String; name: String };
}

const tourSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	destinations: [
		{
			type: Schema.Types.ObjectId,
			ref: "Destination",
		},
	],
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
	},
	price: String,
	duration: String,
	url: String,
	imageUrl: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	startDateTime: {
		type: Date,
		default: Date.now,
	},
	endDateTime: {
		type: Date,
		default: Date.now,
	},
	organizer: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Tour = models.Tour || model("Tour", tourSchema);

export default Tour;
