import TourCard from "@/components/shared/TourCard";
import { getTourByUserId } from "@/lib/actions/tour.actions";
import { ITour } from "@/lib/db/models/tour.model";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Profile = async () => {
	const { sessionClaims } = await auth();

	const clerkId = sessionClaims?.userId as string;

	if (!clerkId) {
		return <div>Not logged in</div>;
	}

	const tours = await getTourByUserId(clerkId);

	return (
		<div className="wrapper py-5">
			<section className="wrapper py-5 space-y-5">
				{/* Title */}
				<div className="w-full text-center">
					<h1 className="text-4xl font-semibold">Your tours</h1>
				</div>

				{/* Render tours */}
				<section>
					{(tours.length === 0 && <div>No tours</div>) || (
						<div className="flex gap-4 flex-wrap justify-center items-center">
							{tours.map((tour: ITour) => (
								<TourCard key={tour._id} tour={tour} />
							))}
						</div>
					)}
				</section>
			</section>
		</div>
	);
};

export default Profile;
