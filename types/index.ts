import { ITour } from "@/lib/db/models/tour.model";

export type CreateUserParams = {
	clerkId: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	photo: string;
};

export interface UpdateUserParams {
	firstName: string;
	lastName: string;
	username: string;
	photo: string;
}

export interface TourProps {
	title: string;
	locationId: string;
	category: string;
	imageUrl: string;
	price: number;
	seats: number;
	days: number;
	nights: number;
	description?: string;
	startDate: Date;
	endDate: Date;
	departId: string;
}

export interface CreateTourParams {
	userId: string;
	tour: TourProps;
	path: string;
}

export interface UpdateTourParams {
	userId: string;
	tour: TourProps;
	tourId: string;
}

export interface TourFormProps {
	userId: string;
	type: string;
	tour?: ITour;
	tourId?: string;
}

export interface CheckoutOrderParams {
	tourTitle: string;
	tourId: string;
	price: number;
	buyer: string;
}

export type CreateOrderParams = {
	stripeId: string;
	tourId: string;
	buyerId: string;
	totalAmount: string;
	createdAt: Date;
};
