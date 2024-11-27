import { Document, model, models, Schema } from "mongoose";

export interface IDepart extends Document {
	_id: string;
	name: string;
}

const departModel = new Schema({
	name: {
		type: String,
		required: true,
	},
});

const Depart = models.Depart || model("Depart", departModel);

export default Depart;
