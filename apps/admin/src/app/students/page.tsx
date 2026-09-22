import { Suspense, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@repo/ui/button";
import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";

import { StudentListing } from "./components/StudentListing";
import { StudentFilterForm } from "./components/student-filter-form/StudentFilterForm";
import type { StudentFilterFormData } from "./components/student-filter-form/schema";

function StudentsPage() {
	const navigate = useNavigate();
	const [filter, setFilter] = useState<StudentFilterFormData | null>(null);

	function onSubmit(data: StudentFilterFormData) {
		const toDate = data.toDate;
		toDate.setHours(23, 59, 59, 999);

		setFilter({
			...data,
			toDate: toDate,
		});
	}

	return (
		<main className="mx-auto my-5 w-96/100">
			<Button onClick={() => navigate("/admin/students/add")}>
				Add A New Student
			</Button>

			<StudentFilterForm onSubmit={onSubmit} />
			<ErrorScreen title="Error Loading Students">
				<Suspense fallback={<QueryLoader>Loading Students ...</QueryLoader>}>
					{filter && <StudentListing filter={filter} />}
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { StudentsPage };
