import { Suspense } from "react";
import { useNavigate } from "react-router";

import { Button } from "@repo/ui/button";
import { ErrorScreen } from "@repo/ui/error-screen";
import { SkeletonList } from "@repo/ui/skeleton";

import { BatchList } from "./components/BatchList";

function BatchesPage() {
	const navigate = useNavigate();

	return (
		<main className="mb-20 space-y-3 p-3 m-auto max-w-250">
			<Button onClick={() => navigate("/admin/batches/add")}>
				Add A New Batch
			</Button>

			<ErrorScreen title="Error Loading Courses">
				<Suspense fallback={<SkeletonList />}>
					<BatchList />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { BatchesPage };
