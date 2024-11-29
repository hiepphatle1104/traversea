import CheckoutButton from "@/components/shared/CheckoutButton";
import { Button } from "@/components/ui/button";
import { getTourById } from "@/lib/actions/tour.actions";
import { getUser } from "@/lib/actions/user.actions";
import { convertImageUrl } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { Clock, Heart, MapPin, Share, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TourDetailPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	const { sessionClaims } = await auth();

	const userId = sessionClaims?.userId as string;

	const user = await getUser(userId);

	const tour = await getTourById(id);
	return (
		<div className="wrapper w-full">
			<section className="wrapper py-5 space-y-5">
				{/* Header large scale */}
				<div className="flex flex-col gap-2 max-lg:hidden">
					{/* Title */}
					<h1 className="text-4xl">{tour.title}</h1>

					{/* Short detail */}
					<section className="text-neutral-500 flex justify-between items-center text-lg select-none">
						{/* Detail */}
						<div className="flex md:gap-4 max-md:flex-col">
							{/* Duration */}
							<section className="detail_icon">
								<Clock size={18} />
								<p>
									{tour.days} days - {tour.nights} nights
								</p>
							</section>

							{/* Location */}
							<section className="detail_icon">
								<MapPin size={18} />
								<p>{tour.location.name}</p>
							</section>

							{/* Tags */}
							<section className="detail_icon">
								<Tag size={18} />
								<p>{tour.category}</p>
							</section>
						</div>

						{/* Share & Save & Update */}
						<div className="flex gap-4 max-lg:hidden">
							{/* Save */}
							<section className="detail_icon">
								<Heart size={18} />
								<p>Save</p>
							</section>

							{/* Share */}
							<section className="detail_icon">
								<Share size={18} />
								<p>Share</p>
							</section>

							{user?._id === tour.provider && (
								<Button variant={"outline"} size={"sm"} asChild>
									<Link href={`/tours/${tour._id}/update`}>Update</Link>
								</Button>
							)}
						</div>
					</section>
				</div>

				{/* Content */}
				<div className="py-5 flex justify-between gap-10">
					<section className="h-[350px] w-full rounded-lg border shadow-md">
						<Image
							src={convertImageUrl(tour.imageUrl)}
							alt="Image"
							width={800}
							height={800}
							className="imageCover rounded-lg"
							priority
						/>
					</section>

					{/* Details */}
					<section className="h-[350px] w-1/3 max-lg:hidden border shadow-md rounded-lg px-5 py-5 flex flex-col justify-between gap-5 shrink-0">
						<div className="flex flex-col justify-between h-full">
							<div className="flex flex-col gap-3">
								<section>
									{/* Title */}
									<h1 className="text-2xl font-semibold line-clamp-1">
										{tour.days} days - {tour.nights} nights
									</h1>

									{/* Location */}
									<p className="text-neutral-500 text-sm tracking-wider">
										{tour.location.name}
									</p>
								</section>

								<section>
									{/* Depart */}
									<p>Depart - {tour.depart.name}</p>

									{/* Start date */}
									<p>Start: {format(tour.startDate, "dd/MM/yyyy")}</p>

									{/* End date */}
									<p>End: {format(tour.endDate, "dd/MM/yyyy")}</p>
								</section>
							</div>

							{/* Pricing */}
							<p className="text-lg flex gap-1">
								$ <span className="text-4xl">{tour.price}</span> USD
							</p>
						</div>

						{/* Checkout button */}
						<CheckoutButton tour={tour} />
					</section>
				</div>

				{/* Header large scale */}
				<div className="flex flex-col gap-2 lg:hidden">
					{/* Title */}
					<h1 className="text-4xl">{tour.title}</h1>

					{/* Short detail */}
					<section className="text-neutral-500 flex justify-between items-center text-lg select-none">
						{/* Detail */}
						<div className="flex md:gap-4 max-md:flex-col">
							{/* Duration */}
							<section className="detail_icon">
								<Clock size={18} />
								<p>
									{tour.days} days - {tour.nights} nights
								</p>
							</section>

							{/* Location */}
							<section className="detail_icon">
								<MapPin size={18} />
								<p>{tour.location.name}</p>
							</section>

							{/* Tags */}
							<section className="detail_icon">
								<Tag size={18} />
								<p>{tour.category}</p>
							</section>
						</div>

						{/* Share & Save */}
						<div className="flex gap-4 max-lg:hidden">
							{/* Save */}
							<section className="detail_icon">
								<Heart size={18} />
								<p>Save</p>
							</section>

							{/* Share */}
							<section className="detail_icon">
								<Share size={18} />
								<p>Share</p>
							</section>
						</div>
					</section>
				</div>

				{/* Footer navigation*/}
				<div>
					{/* Overview */}
					{/* <section>
						<h1 className="text-2xl">Overview</h1>
						<div>
							<p>{tour.overview}</p>
						</div>
					</section> */}

					{/* Description */}
					<section>
						<h1 className="text-2xl">Description</h1>
						<div>
							<p>{tour.description}</p>
						</div>
					</section>

					{/* Review */}
					{/* <section>
						<h1 className="text-2xl">Reviews</h1>
						<div>
							<p>test review</p>
						</div>
					</section> */}
				</div>
			</section>
		</div>
	);
};

export default TourDetailPage;
