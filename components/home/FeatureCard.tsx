import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface FeatureCardProps {
	title: string;
	subtitle: string;
	image_url: string;
	alt: string;
}

const FeatureCard = ({ title, subtitle, image_url, alt }: FeatureCardProps) => {
	return (
		<Card className="w-72 cursor-pointer select-none hoverScaleShadow">
			<CardHeader className="w-full text-center">
				<CardTitle className="text-2xl">{title}</CardTitle>
				<CardDescription className="text-base">{subtitle}</CardDescription>
			</CardHeader>
			<CardContent>
				<Image
					src={image_url}
					alt={alt}
					width={500}
					height={500}
					className="w-full object-cover h-full"
				/>
			</CardContent>
		</Card>
	);
};

export default FeatureCard;
