import Link from "next/link";
import { Button } from "../ui/button";

const AuthenticationError = () => {
	return (
		<div className="wrapper flex items-center justify-center py-20">
			<section className="py-5 px-10 border rounded-lg shadow-md text-center space-y-5">
				<div>
					<h1 className="text-2xl">Authentication Error</h1>
					<p className="text-sm text-neutral-500">
						Please sign in to view this page
					</p>
				</div>
				<Button asChild size={"lg"}>
					<Link href={"/sign-in"}>Sign in</Link>
				</Button>
			</section>
		</div>
	);
};

export default AuthenticationError;
