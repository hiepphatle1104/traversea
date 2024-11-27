import { Document, model, models, Schema } from "mongoose";

export interface ILocation extends Document {
	_id: string;
	name: string;
}

const locationModel = new Schema({
	name: {
		type: String,
		required: true,
	},
});

const Location = models.Location || model("Location", locationModel);

export default Location;
