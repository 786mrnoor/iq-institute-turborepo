import { Pagination } from "@repo/ui/pagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { studentQueries } from "@/queries/students";
import { NotFound } from "../NotFound";
import type { StudentFilterFormData } from "./student-filter-form/schema";
import { StudentsTable } from "./students-table/StudentsTable";

type StudentListingProps = {
	filter: StudentFilterFormData;
};

function StudentListing({ filter }: StudentListingProps) {
	const [page, setPage] = useState(1);
	const [previousFilter, setPreviousFilter] = useState(filter);

	if (filter !== previousFilter) {
		setPreviousFilter(filter);
		setPage(1);
	}

	const { data } = useSuspenseQuery(
		studentQueries.list({ ...previousFilter, limit: 10, page }),
	);

	if (data.students?.length === 0) return <NotFound />;

	const { students, meta } = data;

	return (
		<>
			<p className="mt-5 w-max bg-primary px-8 py-1 text-lg text-white">
				Total Students: {meta?.totalCount}
			</p>

			<StudentsTable students={students} />

			<Pagination
				page={meta.page}
				total={meta.totalCount}
				limit={meta.limit}
				onChange={setPage}
			/>
		</>
	);
}

export { StudentListing };
