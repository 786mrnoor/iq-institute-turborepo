import clsx from "clsx";

import { Skeleton } from "./Skeleton";

type SkeletonTableProps = {
	className?: string;
};
export function SkeletonTable({ className }: SkeletonTableProps) {
	return (
		<div className={clsx("flex w-full flex-col gap-2", className)}>
			{Array.from({ length: 5 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: reason
				<div className="flex gap-4" key={index}>
					<Skeleton className="h-10 flex-1" />
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-10 w-20" />
				</div>
			))}
		</div>
	);
}
