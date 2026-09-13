import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";
import { Suspense } from "react";
import { Form } from "./components/Form";
import { TopicsList } from "./components/TopicsList";
import { EditProvider } from "./context/EditProvider";

function TopicsPage() {
	return (
		<EditProvider>
			<main className="mb-20 space-y-3 p-3 max-w-200 m-auto">
				<Form />

				<ErrorScreen title="Error Loading Topics">
					<Suspense fallback={<QueryLoader>Loading topics...</QueryLoader>}>
						<TopicsList />
					</Suspense>
				</ErrorScreen>
			</main>
		</EditProvider>
	);
}

export { TopicsPage };
