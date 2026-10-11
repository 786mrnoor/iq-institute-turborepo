import type { UserBaseSchema } from "@repo/schemas/users/base.user";
import { TableCell, TableRow } from "@repo/ui/table";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";

type UserCardProps = {
	user: UserBaseSchema;
};

function UserCard({ user }: UserCardProps) {
	return (
		<TableRow>
			<TableCell>
				<strong>{user.name}</strong> <br />
				<span className="text-xs">{user.email}</span>
			</TableCell>
			<TableCell className="capitalize">{user.role}</TableCell>
			<TableCell className="capitalize">{user.status}</TableCell>
			<TableCell>{formatDateTime(user.createdAt)}</TableCell>
		</TableRow>
	);
}

export { UserCard };
