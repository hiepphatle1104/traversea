import { ITour } from "@/lib/db/models/tour.model";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const TourCard = ({ tour }: { tour: ITour }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{tour.title}</CardTitle>
				<CardDescription>
					{tour.days} days - {tour.nights} nights
					{tour.location.name}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};

export default TourCard;
