import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";

import type { GetTeachersSchema } from "@repo/schemas/teachers/get.teachers";
import { ErrorScreen } from "@repo/ui/error-screen";
import { Pagination } from "@repo/ui/pagination";
import { SkeletonTable } from "@repo/ui/skeleton";

import { teacherQueries } from "@/queries/teacher";
import { NotFound } from "../NotFound";
import { TeachersTable } from "./teachers-table/TeachersTable";

type TeacherListingProps = {
	filter: Pick<GetTeachersSchema["query"], "status" | "teacherId" | "adharNo">;
};

function TeacherListingComponent({ filter }: TeacherListingProps) {
	const [page, setPage] = useState(1);
	const [previousFilter, setPreviousFilter] = useState(filter);

	if (filter !== previousFilter) {
		setPreviousFilter(filter);
		setPage(1);
	}

	const { data } = useSuspenseQuery(
		teacherQueries.list({ ...previousFilter, limit: 10, page }),
	);

	if (data.teachers?.length === 0) return <NotFound />;

	const { teachers, meta } = data;

	return (
		<>
			<p className="mt-5 w-max bg-primary px-8 py-1 text-lg text-white">
				Total Teachers: {meta?.totalCount}
			</p>

			<TeachersTable teachers={teachers} />

			<Pagination
				page={meta.page}
				total={meta.totalCount}
				limit={meta.limit}
				onChange={setPage}
			/>
		</>
	);
}

function TeacherListing({ filter }: TeacherListingProps) {
	return (
		<ErrorScreen title="Error Loading Teachers">
			<Suspense fallback={<SkeletonTable />}>
				<TeacherListingComponent filter={filter} />
			</Suspense>
		</ErrorScreen>
	);
}

export { TeacherListing };
