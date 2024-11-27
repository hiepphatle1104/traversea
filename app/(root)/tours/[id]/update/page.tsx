import { TourForm } from "@/components/shared/TourForm";
import { getTourById } from "@/lib/actions/tour.actions";
import { getUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const TourUpdatePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	if (!id) return <div>Something went wrong</div>;

	const { sessionClaims } = await auth();
	const clerkId = sessionClaims?.userId as string;

	if (!clerkId) return <div>Something went wrong</div>;

	const user = await getUser(clerkId);

	if (!user) return <div>Something went wrong</div>;

	const tour = await getTourById(id);

	return (
		<div className="wrapper py-5">
			<section className="wrapper py-5">
				{/* Header */}
				<div className="w-full text-center">
					<h1 className="text-3xl font-semibold">Update</h1>
					<p className="text-lg text-neutral-500">
						Explore our latest tour updates and new destinations
					</p>
				</div>

				{/* Content */}
				<section>
					<TourForm userId={user._id} type="update" tour={tour} tourId={id} />
				</section>
			</section>
		</div>
	);
};

export default TourUpdatePage;
