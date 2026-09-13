import { Button } from "@repo/ui/button";
import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";
import { Suspense } from "react";
import { useNavigate } from "react-router";
import { CourseList } from "./components/CourseList";

function CoursesPage() {
	const navigate = useNavigate();

	return (
		<main className="mb-20 space-y-3 p-3 m-auto max-w-250">
			<Button onClick={() => navigate("/admin/courses/add")}>
				Add A New Course
			</Button>

			<ErrorScreen title="Error Loading Courses">
				<Suspense fallback={<QueryLoader>Loading ...</QueryLoader>}>
					<CourseList />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { CoursesPage };
