"use client";

import { Button } from "@/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className="flex grow justify-center items-center">
			<section className="flex flex-col items-center justify-center px-10 py-8 rounded-lg shadow-md space-y-3 border ">
				<h1 className="text-2xl">Something went wrong!</h1>
				<Button size={"lg"} variant={"destructive"} onClick={() => reset()}>
					Try again
				</Button>
			</section>
		</div>
	);
}
