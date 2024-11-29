"use client";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { ITour } from "@/lib/db/models/tour.model";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
	userId: string;
	tour: ITour;
}

const Checkout = ({ userId, tour }: CheckoutProps) => {
	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get("success")) {
			console.log("Order placed! You will receive an email confirmation.");
		}

		if (query.get("canceled")) {
			console.log(
				"Order canceled -- continue to shop around and checkout when you’re ready."
			);
		}
	}, []);
	const onCheckout = async () => {
		const order = {
			tourTitle: tour.title,
			tourId: tour._id,
			price: tour.price,
			buyer: userId,
		};

		await checkoutOrder(order);
	};
	return (
		<form action={onCheckout}>
			<section>
				<Button
					type="submit"
					role="link"
					className="w-full rounded-full shrink-0"
					size={"lg"}
				>
					Book now
				</Button>
			</section>
		</form>
	);
};

export default Checkout;
