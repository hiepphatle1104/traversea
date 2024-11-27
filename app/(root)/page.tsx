import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";

export default function Home() {
	return (
		<div className="w-full py-5 space-y-10">
			{/* Hero */}
			<Hero />

			{/* Features */}
			<Features />

			{/* Popular destinations */}
			<section className="wrapper">
				<div>
					<h1 className="text-3xl font-semibold">Popular destinations</h1>
					<p className="text-base text-neutral-500">
						Explore the most loved places around the world
					</p>
				</div>
			</section>

			{/* Our best tours */}
			<section className="wrapper">
				<h1 className="text-3xl font-semibold">Explore our best tours</h1>
				<p className="text-base text-neutral-500">
					Carefully designed travel experiences just for you
				</p>
			</section>
		</div>
	);
}
