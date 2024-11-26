import { ITour } from "@/lib/db/models/tour.model";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { convertImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

const TourCard = ({ tour }: { tour: ITour }) => {
	return (
		<Card className="w-80">
			<CardHeader>
				<CardTitle className="text-lg">{tour.title}</CardTitle>
				<CardDescription className="w-full flex flex-col text-base">
					<span>
						{tour.days} days - {tour.nights} nights
					</span>
					<span>{tour.location.name}</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="px-4">
				<div className="h-56 border shadow-md rounded-lg">
					<Image
						src={convertImageUrl(tour.imageUrl)}
						alt="image"
						width={900}
						height={900}
						className="imageCover rounded-lg"
					/>
				</div>
			</CardContent>
			<CardFooter>
				<div className="w-full flex justify-between items-center">
					<span className="text-lg font-semibold">${tour.price}</span>
					<Button variant={"outline"} size={"default"}>
						<Link href={`/tours/${tour._id}`}>Explore</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default TourCard;
