import { Suspense } from "react";
import { useParams } from "react-router";

import { courseBaseSchema } from "@repo/schemas/course/base.course";
import { ErrorScreen } from "@repo/ui/error-screen";
import { SkeletonCard } from "@repo/ui/skeleton";

import { NotFound } from "../NotFound";
import { Course } from "./Course";

function CoursePage() {
	const { id } = useParams();

	const parsed = courseBaseSchema.shape.id.safeParse(id);

	if (!parsed.success) {
		return <NotFound />;
	}

	return (
		<ErrorScreen title="Error Loading Course">
			<Suspense fallback={<SkeletonCard />}>
				<Course id={parsed.data} />
			</Suspense>
		</ErrorScreen>
	);
}

export { CoursePage };
