import { ROLES, type UserRole } from "@repo/schemas/user-roles";

import { PERMISSIONS, type Permission } from "./permissions";

export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
	[ROLES.SUPER_ADMIN]: [...Object.values(PERMISSIONS)],

	[ROLES.ADMIN]: [...Object.values(PERMISSIONS)],

	[ROLES.TEACHER]: [],

	[ROLES.STUDENT]: [PERMISSIONS.TOPIC_READ, PERMISSIONS.COURSE_READ],
};
