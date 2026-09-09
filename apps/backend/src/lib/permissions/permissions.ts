export const PERMISSIONS = {
	USER_CREATE: "user:create",
	USER_READ: "user:read",
	USER_UPDATE: "user:update",
	USER_DELETE: "user:delete",

	TOPIC_CREATE: "topic:create",
	TOPIC_READ: "topic:read",
	TOPIC_UPDATE: "topic:update",
	TOPIC_DELETE: "topic:delete",

	COURSE_CREATE: "course:create",
	COURSE_READ: "course:read",
	COURSE_UPDATE: "course:update",
	COURSE_DELETE: "course:delete",

	STUDENT_CREATE: "student:create",
	STUDENT_READ: "student:read",
	STUDENT_UPDATE: "student:update",
	STUDENT_DELETE: "student:delete",

	ENQUIRY_CREATE: "enquiry:create",
	ENQUIRY_READ: "enquiry:read",
	ENQUIRY_UPDATE: "enquiry:update",
	ENQUIRY_DELETE: "enquiry:delete",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
