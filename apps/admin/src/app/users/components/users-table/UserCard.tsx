import type { UserBaseSchema } from "@repo/schemas/users/base.user";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";

type UserCardProps = {
	user: UserBaseSchema;
};

function UserCard({ user }: UserCardProps) {
	return (
		<tr className="align-top text-sm *:border *:border-gray-300 *:p-2 odd:bg-gray-100 dark:odd:bg-neutral-900 dark:*:border-neutral-700">
			<td>
				<strong>{user.name}</strong> <br />
				<span className="text-xs">{user.email}</span>
			</td>
			<td className="capitalize">{user.role}</td>
			<td className="capitalize">{user.status}</td>
			<td>{formatDateTime(user.createdAt)}</td>
		</tr>
	);
}

export { UserCard };
