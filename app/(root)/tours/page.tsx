import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const ToursPage = () => {
	// Render tour list

	return (
		<div className="wrapper py-5">
			<section className="wrapper py-5 space-y-5">
				{/* Title */}
				<div className="w-full text-center">
					<h1 className="text-4xl font-semibold">Our tours</h1>
					<p className="text-neutral-500 text-lg">
						Carefully designed travel experiences just for you
					</p>
				</div>

				{/* Searchbar & Create button */}
				<div className="w-full flex justify-between items-center max-md:flex-col gap-5">
					{/* Searchbox */}
					<section className="flex items-center w-96 border rounded-lg">
						<Button variant={"secondary"} className="border-r" type="submit">
							<Search size={20} className="text-neutral-500 cursor-pointer" />
						</Button>
						<Input
							type="text"
							placeholder="Search for tours"
							className="w-full border-none shadow-none focus-visible:ring-0"
						/>
					</section>

					{/* Create tour button */}
					<Button variant={"outline"} size={"lg"} asChild>
						<Link href={"/tours/create"}>Create tour</Link>
					</Button>
				</div>

				{/* Render tour list */}
				<div></div>
			</section>
		</div>
	);
};

export default ToursPage;
