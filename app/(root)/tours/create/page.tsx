"use server";

import { TourForm } from "@/components/shared/TourForm";
import { getUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

const TourCreatePage = async () => {
	const { sessionClaims } = await auth();

	const clerkId = sessionClaims?.userId as string;

	if (!clerkId) return <div>Something went wrong</div>;

	const user = await getUser(clerkId);

	if (!user) return <div>Something went wrong</div>;
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
				<TourForm userId={user._id} type="create" />
			</section>
		</div>
	);
};

export default TourCreatePage;
