import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createCourse, defaultCourseData } from "../helpers/course";

let agent: TestAgent;
beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("GET /courses/:id", () => {
	it("should return a course by id", async () => {
		const course = await createCourse();

		const response = await agent.get(API_PATH.courses.withId(course._id));

		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({
			id: course._id.toString(),
			...defaultCourseData,
		});
	});

	it("should return 404 when course does not exist", async () => {
		const response = await agent.get(
			API_PATH.courses.withId("507f1f77bcf86cd799439011"),
		);

		expect(response.status).toBe(404);
	});

	it("should return 400 for an invalid course id", async () => {
		const response = await agent.get(API_PATH.courses.withId("invalid-id"));

		expect(response.status).toBe(400);
	});

	it("should not return a soft-deleted course", async () => {
		const course = await createCourse({
			...defaultCourseData,
			deletedAt: new Date(),
		});

		const response = await agent.get(API_PATH.courses.withId(course._id));

		expect(response.status).toBe(404);
	});
});
