import type { Types } from "mongoose";

const BASE_PATH = "/api";

export const API_PATH = {
	auth: {
		login: `${BASE_PATH}/auth/login` as const,
	},
	topics: {
		base: `${BASE_PATH}/topics` as const,
		withId: (id: string | Types.ObjectId) =>
			`${API_PATH.topics.base}/${id || id.toString()}` as const,
	},
};
