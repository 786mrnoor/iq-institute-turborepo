import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	typedRoutes: true,
	async rewrites() {
		const adminUrl = process.env.NEXT_ADMIN_URL;
		const backendUrl = process.env.NEXT_BACKEND_URL;

		return [
			{
				source: "/admin/:path*",
				destination: `${adminUrl}/admin/:path*`,
			},
			{
				source: "/api/:path*",
				destination: `${backendUrl}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
