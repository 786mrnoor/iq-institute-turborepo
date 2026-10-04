import { Skeleton } from "./Skeleton";

function SkeletonFieldGroup() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton className="h-6 w-20" />
			<Skeleton className="h-8 w-full" />
		</div>
	);
}

export { SkeletonFieldGroup };
