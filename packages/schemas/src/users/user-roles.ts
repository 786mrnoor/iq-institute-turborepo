export const ROLES = {
	SUPER_ADMIN: "super-admin",
	ADMIN: "admin",
	TEACHER: "teacher",
	STUDENT: "student",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
