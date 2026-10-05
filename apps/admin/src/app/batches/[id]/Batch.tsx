import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";
import { ErrorScreen } from "@repo/ui/error-screen";
import { Skeleton } from "@repo/ui/skeleton";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";

import { batchesQueries } from "@/queries/batches";
import { CourseDetails } from "./CourseDetails";
import { TeacherDetails } from "./TeacherDetails";

type BatchProps = {
	id: BatchBaseSchema["id"];
};

function Batch({ id }: BatchProps) {
	const { data: batch } = useSuspenseQuery(batchesQueries.detail(id));

	return (
		<main className="mx-3 my-5 mb-20 space-y-3 rounded-lg border border-gray-300 p-3 md:px-10 bg-white dark:bg-neutral-800 dark:border-neutral-700">
			<h1 className="mb-10 text-center text-2xl font-semibold">{batch.name}</h1>

			<p>
				<strong>Duration: </strong>
				{formatDateTime(batch.startDate)} - {formatDateTime(batch.endDate)}
			</p>
			<p>
				<strong>Capacity: </strong>
				{batch.capacity}
			</p>
			<p>
				<strong>Status: </strong>
				<span className="capitalize">{batch.status}</span>
			</p>
			<p>
				<strong>Schedule: </strong>
				{batch.schedule.startTime} - {batch.schedule.endTime}
			</p>

			<ErrorScreen>
				<Suspense fallback={<Skeleton className="h-6 w-full" />}>
					<CourseDetails id={batch.courseId} />
				</Suspense>
			</ErrorScreen>

			<ErrorScreen>
				<Suspense fallback={<Skeleton className="h-6 w-full" />}>
					<TeacherDetails id={batch.teacherId} />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { Batch };
