import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@repo/ui/skeleton";

import { authQueries } from "@/queries/auth";

function ProfileDetails() {
	const { data, error } = useQuery(authQueries.me);
	return (
		<div className="hidden xs:block overflow-hidden">
			{data ? (
				<p className="text-ellipsis overflow-hidden whitespace-nowrap">
					{data.name}
				</p>
			) : error ? (
				<p className="text-red-500">Error</p>
			) : (
				<Skeleton className="h-6 w-30 mb-2" />
			)}

			{data ? (
				<p className="text-right">
					{data.role === "super-admin" ? "Super Admin" : "Admin"}
				</p>
			) : error ? (
				<p className="text-red-500">Error</p>
			) : (
				<Skeleton className="h-6 w-30" />
			)}
		</div>
	);
}

export { ProfileDetails };
