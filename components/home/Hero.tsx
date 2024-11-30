import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
	return (
		<>
			{/* Hero */}
			<section className="wrapper flex items-center max-md:flex-col-reverse justify-between py-5">
				<div className="space-y-2 max-md:text-center">
					<h1 className="text-3xl md:text-4xl font-semibold">
						Discover Your Next Adventure
					</h1>
					<div className="text-lg text-neutral-500">
						<span>Explore the world with curated tours</span>
						<br />
						<span>and unforgettable experiences.</span>
					</div>
					<Button size={"lg"} asChild>
						<Link href={"/tours"}>Explore now</Link>
					</Button>
				</div>
				<Image
					src="/hero.svg"
					alt="Hero image"
					width={450}
					height={450}
					priority
				/>
			</section>
		</>
	);
};

export default Hero;
