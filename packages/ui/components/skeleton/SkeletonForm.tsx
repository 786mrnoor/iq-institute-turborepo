import clsx from "clsx";

import { Skeleton } from "./Skeleton";
import { SkeletonFieldGroup } from "./SkeletonFieldGroup";

type SkeletonFormProps = {
	className?: string;
};

export function SkeletonForm({ className }: SkeletonFormProps) {
	return (
		<div className={clsx("flex w-full flex-col gap-3", className)}>
			{Array.from({ length: 3 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: not needed
				<SkeletonFieldGroup key={index} />
			))}
			<Skeleton className="h-8 w-24" />
		</div>
	);
}
