"use client";

import { Button } from "../ui/button";
import { ITour } from "@/lib/db/models/tour.model";
import Checkout from "./Checkout";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

const CheckoutButton = ({ tour }: { tour: ITour }) => {
	const { user } = useUser();
	const userId = user?.publicMetadata.userId as string;
	const tourExpired = new Date(tour.startDate) < new Date();
	return (
		<>
			{(tourExpired && (
				<Button className="rounded-full w-full shrink-0" size={"lg"} disabled>
					Not available
				</Button>
			)) || (
				<>
					<SignedOut>
						<Button
							className="rounded-full w-full shrink-0"
							size={"lg"}
							asChild
						>
							<Link href="/sign-in">Sign in</Link>
						</Button>
					</SignedOut>

					<SignedIn>
						<Checkout tour={tour} userId={userId} />
					</SignedIn>
				</>
			)}
		</>
	);
};

export default CheckoutButton;
