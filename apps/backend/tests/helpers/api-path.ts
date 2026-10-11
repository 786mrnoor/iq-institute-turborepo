import type { Types } from "mongoose";

const BASE_PATH = "/api";

export const API_PATH = {
	auth: {
		login: `${BASE_PATH}/auth/login` as const,
	},
	topics: {
		base: `${BASE_PATH}/topics` as const,
		withId: (id: string | Types.ObjectId) =>
			`${API_PATH.topics.base}/${id.toString()}` as const,
	},
	courses: {
		base: `${BASE_PATH}/courses` as const,
		withId: (id: string | Types.ObjectId) =>
			`${API_PATH.courses.base}/${id.toString()}` as const,
	},
	students: {
		base: `${BASE_PATH}/students` as const,
		withId: (id: string | Types.ObjectId) =>
			`${API_PATH.students.base}/${id.toString()}` as const,
	},
};
