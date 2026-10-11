import type { UserBaseSchema } from "@repo/schemas/users/base.user";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/table";

import { UserCard } from "./UserCard";

type UsersTableProps = {
	users: UserBaseSchema[];
};

function UsersTable({ users }: UsersTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name / Email</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Created At</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users?.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</TableBody>
		</Table>
	);
}

export { UsersTable };
