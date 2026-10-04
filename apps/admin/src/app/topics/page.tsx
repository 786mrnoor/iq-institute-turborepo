import { Suspense } from "react";

import { ErrorScreen } from "@repo/ui/error-screen";
import { SkeletonList } from "@repo/ui/skeleton";

import { Form } from "./components/Form";
import { TopicsList } from "./components/TopicsList";
import { EditProvider } from "./context/EditProvider";

function TopicsPage() {
	return (
		<EditProvider>
			<main className="mb-20 space-y-3 p-3 max-w-200 m-auto">
				<Form />

				<ErrorScreen title="Error Loading Topics">
					<Suspense fallback={<SkeletonList />}>
						<TopicsList />
					</Suspense>
				</ErrorScreen>
			</main>
		</EditProvider>
	);
}

export { TopicsPage };
