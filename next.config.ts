import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "**.edgestore.dev",
			},
		],
	},
};

export default nextConfig;
