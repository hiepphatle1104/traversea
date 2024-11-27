import { Schema, Document, models, model } from "mongoose";

export interface IOrder extends Document {
	createdAt: Date;
	stripeId: string;
	totalAmount: string;
	tour: {
		_id: string;
		title: string;
	};
	buyer: {
		_id: string;
		username: string;
	};
}

export type IOrderItem = {
	_id: string;
	totalAmount: string;
	createdAt: Date;
	tourTitle: string;
	tourId: string;
	buyer: string;
};

const orderModel = new Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	stripeId: {
		type: String,
		required: true,
		unique: true,
	},
	totalAmount: {
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

const Order = models.Order || model("Order", orderModel);

export default Order;
