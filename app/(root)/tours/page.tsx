"use client";

import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import TourCard from "@/components/shared/TourCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllTour, getTourByName } from "@/lib/actions/tour.actions";
import { ITour } from "@/lib/db/models/tour.model";
import Link from "next/link";
import { useEffect, useState } from "react";

const ToursPage = () => {
	const [search, setSearch] = useState<string>("");
	const [tours, setTours] = useState<ITour[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getTours = async () => {
			setLoading(true);
			if (search === "") {
				const allTours = await getAllTour();
				setTours(allTours);
			} else {
				const searchTours = await getTourByName(search);
				setTours(searchTours);
			}

			setLoading(false);
		};
		getTours();
	}, [search]);

	return (
		<div className="wrapper py-5 w-full flex grow">
			<section className="wrapper py-5 space-y-5 w-full flex flex-col grow">
				{/* Title */}
				<div className="w-full text-center">
					<h1 className="text-4xl font-semibold">Our tours</h1>
					<p className="text-neutral-500 text-lg">
						Carefully designed travel experiences just for you
					</p>
				</div>

				{/* Searchbar & Create button */}
				<div className="w-full flex justify-between items-center max-md:flex-col gap-5">
					{/* Searchbox */}
					<section className="flex items-center w-96 border rounded-lg">
						<Input
							type="text"
							placeholder="Search for tours"
							className="w-full border-none shadow-none focus-visible:ring-0"
							onChange={(e) => setSearch(e.target.value)}
							value={search}
						/>
					</section>

					{/* Create tour button */}
					<Button variant={"outline"} size={"lg"} asChild>
						<Link href={"/tours/create"}>Create tour</Link>
					</Button>
				</div>

				{/* Render tour list */}
				{/* <div className="w-full flex gap-5 flex-wrap justify-center items-center test"> */}
				<div className="flex grow w-full gap-5 flex-wrap justify-center items-center">
					{(!loading && (
						<>
							{tours.map((tour: ITour) => (
								<TourCard key={tour._id} tour={tour} />
							))}
						</>
					)) || <LoadingSkeleton />}
				</div>
			</section>
		</div>
	);
};

export default ToursPage;
