"use client";

import { ITour } from "@/lib/db/models/tour.model";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import Image from "next/image";
import { convertImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChartLine } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const TourCard = ({ tour }: { tour: ITour }) => {
	const { user } = useUser();
	// const [isOwner, setIsOwner] = useState(false);

	const userId = user?.publicMetadata.userId as string;

	const providerId = tour.provider._id;

	// useEffect(() => {
	// 	setIsOwner(userId === providerId);
	// }, [userId, providerId]);

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
						priority
					/>
				</div>
			</CardContent>
			<CardFooter>
				<div className="w-full flex justify-between items-center">
					<span className="text-lg font-semibold">${tour.price}</span>
					<div className="flex gap-2 items-center justify-center">
						<Button size={"default"} asChild>
							<Link href={`/tours/${tour._id}`}>View</Link>
						</Button>

						{providerId === userId && userId && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant={"outline"}
											asChild
											className="text-black"
											size={"default"}
										>
											<Link href={`/profile/${tour._id}`}>
												<ChartLine size={24} />
											</Link>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Open stats</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default TourCard;
