import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
	"/sign-up(.*)",
	"/sign-in(.*)",
	"/",
	"/tours(.*)",
	"/profile",
	"/api/webhooks/clerk(.*)",
	"/api/webhooks/stripe(.*)",
	"/api/edgestore(.*)",
]);

const isAuthRoute = createRouteMatcher([
	"/tours/create",
	"/tours/(.*)/update",
	"/profile/(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
	if (!isPublicRoute(request)) {
		await auth.protect();
	} else if (isAuthRoute(request)) {
		await auth.protect();
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
