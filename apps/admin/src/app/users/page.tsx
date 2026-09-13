import { Button } from "@repo/ui/button";
import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router";
import { UserListing } from "./components/UsersListing";
import type { UserFilterFormData } from "./components/user-filter-form/schema";
import { UserFilterForm } from "./components/user-filter-form/UserFilterForm";

function UsersPage() {
	const navigate = useNavigate();
	const [filter, setFilter] = useState<UserFilterFormData | null>(null);

	function onSubmit(data: UserFilterFormData) {
		const toDate = data.toDate;
		toDate.setHours(23, 59, 59, 999);

		setFilter({
			...data,
			toDate: toDate,
		});
	}

	return (
		<main className="mx-auto my-5 w-96/100">
			<Button onClick={() => navigate("/admin/users/create")}>
				Create A New User
			</Button>

			<UserFilterForm onSubmit={onSubmit} />

			<ErrorScreen title="Error Loading Users">
				<Suspense fallback={<QueryLoader />}>
					{filter && <UserListing filter={filter} />}
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export default UsersPage;
