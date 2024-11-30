"use client";

import AuthenticationError from "@/components/shared/AuthenticationError";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import TourCard from "@/components/shared/TourCard";
import { getTourByUserId } from "@/lib/actions/tour.actions";
import { ITour } from "@/lib/db/models/tour.model";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Profile = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [tours, setTours] = useState<ITour[]>([]);
	const [error, setError] = useState<string | null>(null);
	const { user } = useUser();

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
			if (tours.length === 0) {
				setError("Authentication timed out. Please try again.");
			}
		}, 5 * 1000);

		const getTours = async () => {
			try {
				if (user) {
					const userId = user.publicMetadata.userId as string;

					const data = await getTourByUserId(userId);

					setTours(data);
					clearTimeout(timer);
					setLoading(false);
				}
			} catch (err: any) {
				setError(err.message || "An unexpected error occurred");
				setLoading(false);
			}
		};

		getTours();

		return () => clearTimeout(timer);
	}, [user]);

	if (loading)
		return (
			<div className="flex grow">
				<LoadingSkeleton />
			</div>
		);

	if (error) {
		return <AuthenticationError error={error} />;
	}

	return (
		<div className="wrapper py-5">
			<section className="wrapper py-5 space-y-5">
				{/* Title */}
				<div className="w-full text-center">
					<h1 className="text-4xl font-semibold">Your tours</h1>
				</div>

				{/* Render tours */}
				<section>
					{(tours.length === 0 && <div>You dont have no tours</div>) || (
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
