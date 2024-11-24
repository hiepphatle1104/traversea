import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Features = () => {
	return (
		<div className="w-full px-5">
			<section className="wrapper bg-gray-50 py-10 space-y-10 rounded-lg border border-neutral-200 shadow-md">
				<h1 className="text-3xl font-semibold">Why choose us?</h1>
				<div className="w-full flex max-md:flex-col items-center gap-6 md:gap-10 justify-center flex-wrap">
					<Card className="w-80 cursor-pointer hover:scale-105 transition-transform hover:shadow-md">
						<CardHeader className="w-full text-center">
							<CardTitle className="text-2xl">Affordable Pricing</CardTitle>
							<CardDescription className="text-base">
								Best value for your money
							</CardDescription>
						</CardHeader>
						<CardContent className="w-full">
							<Image
								src={"/feature1.svg"}
								alt="feature1"
								width={500}
								height={500}
								className="w-full object-cover h-full"
							/>
						</CardContent>
					</Card>
					<Card className="w-80 cursor-pointer hover:scale-105 transition-transform hover:shadow-md">
						<CardHeader className="w-full text-center">
							<CardTitle className="text-2xl">Expert Guides</CardTitle>
							<CardDescription className="text-base">
								Professional and knowledgeable travel experts
							</CardDescription>
						</CardHeader>
						<CardContent className="w-full">
							<Image
								src={"/feature2.svg"}
								alt="feature2"
								width={500}
								height={500}
								className="w-full object-cover h-full"
							/>
						</CardContent>
					</Card>
					<Card className="w-80 cursor-pointer hover:scale-105 transition-transform hover:shadow-md">
						<CardHeader className="w-full text-center">
							<CardTitle className="text-2xl">24/7 Support</CardTitle>
							<CardDescription className="text-base">
								We’re always here to help
							</CardDescription>
						</CardHeader>
						<CardContent className="w-full">
							<Image
								src={"/feature3.svg"}
								alt="feature3"
								width={500}
								height={500}
								className="w-full object-cover h-full"
							/>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
};

export default Features;
