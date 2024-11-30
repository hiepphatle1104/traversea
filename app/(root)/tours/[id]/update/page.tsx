"use server";

import { TourForm } from "@/components/shared/TourForm";
import { getTourById } from "@/lib/actions/tour.actions";
import { auth } from "@clerk/nextjs/server";

const TourUpdatePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	const { sessionClaims } = await auth();

	const userId = sessionClaims?.publicMetadata?.userId as string;

	const tour = await getTourById(id);

	return (
		<div className="wrapper py-5 w-full">
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
					<TourForm userId={userId} type="update" tour={tour} tourId={id} />
				</section>
			</section>
		</div>
	);
};

export default TourUpdatePage;
