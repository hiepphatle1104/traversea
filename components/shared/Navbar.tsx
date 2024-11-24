"use client";

import { AlignRight } from "lucide-react";
import Link from "next/link";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Navbar = () => {
	const pathName = usePathname();

	const navItems = [
		{ label: "Home", path: "/" },
		{ label: "Tours", path: "/tours" },
		{ label: "Destinations", path: "/destinations" },
	];
	return (
		<div className="w-full select-none border border-b-neutral-100 ">
			<div className="flex justify-between items-center wrapper py-3 shadow-sm">
				<h1 className="text-2xl tracking-wider text-cyan-600">Traversea</h1>
				<nav>
					<ul className="flex gap-16 max-md:hidden">
						{navItems.map((item) => {
							const isActive = pathName === item.path;
							return (
								<li
									className={`${
										isActive && "text-orange-500"
									} text-base transition-all`}
									key={item.label}
								>
									<Link href={item.path}>{item.label}</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Authentication */}
				<div className="text-base flex gap-4 items-center">
					<SignedOut>
						<Button asChild size={"lg"} className="rounded-full">
							<SignInButton />
						</Button>
					</SignedOut>

					<SignedIn>
						<UserButton />
					</SignedIn>

					<Sheet>
						<SheetTrigger className="md:hidden">
							<AlignRight size={24} />
						</SheetTrigger>
						<SheetContent className="max-w-xs select-none flex flex-col gap-5">
							<SheetHeader>
								<SheetTitle className="text-xl">Traversea</SheetTitle>
							</SheetHeader>
							<ul className="flex flex-col gap-5 justify-center items-center">
								{navItems.map((item) => {
									const isActive = pathName === item.path;
									return (
										<li
											className={`${
												isActive && "text-orange-500"
											} text-base transition-all`}
											key={item.label}
										>
											<Link href={item.path}>{item.label}</Link>
										</li>
									);
								})}
							</ul>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
