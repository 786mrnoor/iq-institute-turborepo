import { Pagination } from "@repo/ui/pagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { userQueries } from "@/queries/users";
import type { UserFilterFormData } from "./user-filter-form/schema";
import { UsersTable } from "./users-table/UsersTable";

type UserListingProps = {
	filter: UserFilterFormData;
};

function UserListing({ filter }: UserListingProps) {
	const [page, setPage] = useState(1);
	const [previousFilter, setPreviousFilter] = useState(filter);

	if (filter !== previousFilter) {
		setPreviousFilter(filter);
		setPage(1);
	}

	const { data } = useSuspenseQuery(
		userQueries.list({ ...previousFilter, limit: 10, page }),
	);

	if (!data || data?.users?.length === 0)
		return <p className="text-center text-lg">No Users Found</p>;

	const { users, meta } = data;

	return (
		<>
			<p className="mt-5 w-max bg-primary px-8 py-1 text-lg text-white">
				Total Users: {meta?.totalCount}
			</p>

			<UsersTable users={users} />

			<Pagination
				page={meta.page}
				total={meta.totalCount}
				limit={meta.limit}
				onChange={setPage}
			/>
		</>
	);
}

export { UserListing };
