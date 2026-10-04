import clsx from "clsx";

import { Skeleton } from "./Skeleton";

type SkeletonListProps = {
	size?: "sm" | "base";
	className?: string;
};

function SkeletonList({ size = "base", className }: SkeletonListProps) {
	return (
		<div className={clsx("flex w-full flex-col gap-3", className)}>
			{Array.from({ length: 5 }).map((_, index) => (
				<Skeleton
					// biome-ignore lint/suspicious/noArrayIndexKey: reason
					key={index}
					className={clsx("w-full", size === "base" ? "h-15" : "h-5")}
				/>
			))}
		</div>
	);
}

export { SkeletonList };
