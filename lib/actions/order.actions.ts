"use server";

import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { handleError } from "../utils";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../db";
import Order from "../db/models/order.model";
import User from "../db/models/user.model";
import Tour from "../db/models/tour.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

	const price = order.price * 100;

	try {
		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: "usd",
						unit_amount: price,
						product_data: {
							name: order.tourTitle,
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				tourId: order.tourId,
				buyerId: order.buyer,
			},
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
			cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
		});

		redirect(session.url!);
	} catch (error) {
		throw error;
	}
};

export const createOrder = async (order: CreateOrderParams) => {
	try {
		await connectToDatabase();

		const buyer = await User.findById(order.buyerId);
		const tour = await Tour.findById(order.tourId);

		if (!buyer || !tour) {
			throw new Error("User or tour not found");
		}

		const newOrder = Order.create({
			...order,
			buyer: buyer._id,
			tour: tour._id,
		});

		return JSON.parse(JSON.stringify(newOrder));
	} catch (error) {
		handleError(error);
	}
};

export const getAllOrders = async () => {
	try {
		await connectToDatabase();

		const orders = await Order.find().populate("buyer");

		return JSON.parse(JSON.stringify(orders));
	} catch (error) {
		handleError(error);
	}
};

export const getOrdersById = async (id: string) => {
	try {
		await connectToDatabase();

		const orders = await Order.find({ tour: id }).populate("buyer");

		if (!orders) throw new Error("Orders not found");

		return JSON.parse(JSON.stringify(orders));
	} catch (error) {
		handleError(error);
	}
};
