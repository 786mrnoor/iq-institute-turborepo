import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { Course } from "@/models/course.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createCourse, defaultCourseData } from "../helpers/course";

let agent: TestAgent;
beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("DELETE /courses/:id", () => {
	it("should return 401 when user is not authenticated", async () => {
		const response = await request(app).delete(
			API_PATH.courses.withId("507f1f77bcf86cd799439011"),
		);

		expect(response.status).toBe(401);
	});

	it("should soft-delete a course", async () => {
		const course = await createCourse();

		const response = await agent.delete(API_PATH.courses.withId(course._id));

		expect(response.status).toBe(204);

		const deletedCourse = await Course.findById(course._id);

		expect(deletedCourse).not.toBeNull();
		expect(deletedCourse?.deletedAt).not.toBeNull();
	});

	it("should return 404 when course does not exist", async () => {
		const response = await agent.delete(
			API_PATH.courses.withId("507f1f77bcf86cd799439011"),
		);

		expect(response.status).toBe(404);
	});

	it("should return 400 for an invalid course id", async () => {
		const response = await agent.delete(API_PATH.courses.withId("invalid-id"));

		expect(response.status).toBe(400);
	});

	it("should not allow deleting an already deleted course", async () => {
		const course = await createCourse({
			...defaultCourseData,
			deletedAt: new Date(),
		});

		const response = await agent.delete(API_PATH.courses.withId(course._id));

		expect(response.status).toBe(404);
	});

	it.todo("should not delete a course that is used by a batch");
	it.todo("should not delete a course that is used by an enrollment");
});
