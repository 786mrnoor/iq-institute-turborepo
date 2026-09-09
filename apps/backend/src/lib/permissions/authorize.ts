import type { UserRole } from "@repo/schemas/user-roles";
import { AppError } from "@repo/utils/app-error.ts";
import type { Permission } from "./permissions";
import { ROLE_PERMISSIONS } from "./role-permissions";

function authorize(role: UserRole, requiredPermission: Permission) {
	const permissions = ROLE_PERMISSIONS[role] ?? [];

	if (!permissions.includes(requiredPermission)) {
		throw new AppError(
			403,
			"You do not have permission to perform this action.",
		);
	}
}

export { authorize };
