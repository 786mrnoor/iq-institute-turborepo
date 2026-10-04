import { Skeleton } from "./Skeleton";

export function SkeletonCard() {
	return (
		<div className="p-3 mx-3 space-y-3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-300 dark:border-neutral-700">
			<div className="flex flex-col gap-1">
				<Skeleton className="h-8 w-2/3" />
				<Skeleton className="h-6 w-1/2" />
			</div>
			<div>
				<Skeleton className="w-full h-50" />
			</div>
		</div>
	);
}
