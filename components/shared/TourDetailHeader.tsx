import { ITour } from "@/lib/db/models/tour.model";
import { Clock, Heart, MapPin, Share, Tag } from "lucide-react";

const TourDetailHeader = ({ tour }: { tour: ITour }) => {
	return (
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
	);
};

export default TourDetailHeader;
