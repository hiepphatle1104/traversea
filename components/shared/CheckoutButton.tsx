"use server";

import { Button } from "../ui/button";
import { ITour } from "@/lib/db/models/tour.model";
import Checkout from "./Checkout";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const CheckoutButton = async ({ tour }: { tour: ITour }) => {
	const { sessionClaims } = await auth();
	const publicMetadata = sessionClaims?.publicMetadata as { userId?: string };
	const userId = publicMetadata?.userId as string;

	const tourExpired = new Date(tour.startDate) < new Date();
	return (
		<>
			{(tourExpired && (
				<Button className="rounded-full w-full shrink-0" size={"lg"} disabled>
					Not available
				</Button>
			)) || (
				<>
					{(userId && <Checkout tour={tour} userId={userId} />) || (
						<Button
							className="rounded-full w-full shrink-0"
							size={"lg"}
							asChild
						>
							<Link href="/sign-in">Sign in</Link>
						</Button>
					)}
				</>
			)}
		</>
	);
};

export default CheckoutButton;
