"use server";

import { getAllTour } from "@/lib/actions/tour.actions";
import { ITour } from "@/lib/db/models/tour.model";
import TourCard from "../shared/TourCard";

const OurTours = async () => {
	const tours = await getAllTour();

	if (!tours) return <div>Loading...</div>;
	return (
		<div className="flex flex-wrap gap-4 items-center justify-center">
			{tours.map((tour: ITour) => (
				<TourCard key={tour._id} tour={tour} />
			))}
		</div>
	);
};

export default OurTours;
