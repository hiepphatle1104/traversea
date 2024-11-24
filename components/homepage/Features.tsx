import FeatureCard from "./FeatureCard";

const Features = () => {
	return (
		<div className="w-full py-10 bg-gray-100 border border-neutral-200 shadow-sm">
			<section className="wrapper flex flex-col items-center justify-center gap-5 md:gap-10">
				<h1 className="text-3xl font-semibold">Why choose us?</h1>

				{/* Features */}
				<div className="flex gap-5 md:gap-10 max-md:flex-col flex-wrap items-center justify-center">
					<FeatureCard
						title="Affordable Pricing"
						subtitle="Best value for your money"
						image_url="/feature1.svg"
						alt="feature1"
					/>
					<FeatureCard
						title="Expert Guides"
						subtitle="Professional and knowledgeable travel experts"
						image_url="/feature2.svg"
						alt="feature2"
					/>
					<FeatureCard
						title="24/7 Support"
						subtitle="We’re always here to help"
						image_url="/feature3.svg"
						alt="feature3"
					/>
				</div>
			</section>
		</div>
	);
};

export default Features;
