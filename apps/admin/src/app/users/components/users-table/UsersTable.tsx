import type { UserBaseSchema } from "@repo/schemas/users/base.user";
import { UserCard } from "./UserCard";

type UsersTableProps = {
	users: UserBaseSchema[];
};

function UsersTable({ users }: UsersTableProps) {
	return (
		<div className="overflow-auto">
			<table border={1} className="mb-4 w-full border border-gray-300">
				<thead className="bg-black text-white">
					<tr className="*:border *:border-gray-300 *:p-2">
						<th>Name / Email</th>
						<th>Role</th>
						<th>Status</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<UserCard key={user.id} user={user} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export { UsersTable };
