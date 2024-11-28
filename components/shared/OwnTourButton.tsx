"use client";

import { getUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";

interface OwnTourButtonParams {
	tourId: string;
	providerId: string;
}

const OwnTourButton = ({ tourId, providerId }: OwnTourButtonParams) => {
	const [isOwnTour, setIsOwnTour] = useState(false);

	const { user } = useUser();

	if (!user) {
		return <div>test</div>;
	}

	const userId = user.publicMetadata.userId as string;

	if (userId === providerId) return setIsOwnTour(true);

	return (
		<div>
			{(isOwnTour && (
				<Button variant="secondary" className="w-24">
					View
				</Button>
			)) || (
				<Button variant="default" className="w-24">
					Book
				</Button>
			)}
		</div>
	);
};

export default OwnTourButton;
