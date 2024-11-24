import { Document, model, models, Schema } from "mongoose";

export interface IOrder extends Document {
	createdAt: Date;
	stripeId: string;
	seats: string;
	tour: {
		_id: string;
		title: string;
	};
	buyer: {
		_id: string;
		firstName: string;
		lastName: string;
	};
}

export type IOrderItem = {
	_id: string;
	seats: string;
	createdAt: Date;
	tourTitle: string;
	tourId: string;
	buyer: string;
};

const orderSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	stripeId: {
		type: String,
		required: true,
		unique: true,
	},
	seats: {
		type: String,
	},
	tour: {
		type: Schema.Types.ObjectId,
		ref: "Tour",
	},
	buyer: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
