import { Document, model, models, Schema } from "mongoose";

export interface IDestination extends Document {
	_id: String;
	name: String;
}

const destinationSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

const Destination =
	models.Destination || model("Destination", destinationSchema);

export default Destination;
