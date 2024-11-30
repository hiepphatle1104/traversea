"use server";

import { TourForm } from "@/components/shared/TourForm";
import { auth } from "@clerk/nextjs/server";

const TourCreatePage = async () => {
	const { sessionClaims } = await auth();

	const userId = sessionClaims?.publicMetadata?.userId as string;

	return (
		<div className="wrapper py-5 w-full">
			<section className="wrapper py-5">
				{/* Header */}
				<div className="w-full text-center">
					<h1 className="text-3xl font-semibold">Create new tour</h1>
					<p className="text-lg text-neutral-500">
						Discover wonders, one adventure at a time
					</p>
				</div>

				{/* Content */}
				<TourForm userId={userId} type="create" />
			</section>
		</div>
	);
};

export default TourCreatePage;
