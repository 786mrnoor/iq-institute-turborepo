import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import { Course } from "../../src/models/course.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createCourse, defaultCourseData } from "../helpers/course";
import { createTopic } from "../helpers/topic";

const BASE_PATH = API_PATH.courses.base;

let agent: TestAgent;
beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("GET /courses", () => {
	it("should return an empty list when no courses exist", async () => {
		const response = await agent.get(BASE_PATH);

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(0);
	});

	it("should return all courses", async () => {
		const javascript = await createTopic();
		const typescript = await createTopic("TypeScript");

		const javascriptCourseData = {
			...defaultCourseData,
			topics: [javascript._id],
		};
		const typescriptCourseData = {
			title: "TypeScript Development",
			duration: {
				value: 3,
				unit: "month" as const,
			},
			eligibility: "12th pass",
			fee: 10000,
			description: "TypeScript course",
			topics: [typescript._id],
		};
		await Course.create([javascriptCourseData, typescriptCourseData]);

		const response = await agent.get(BASE_PATH);

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(2);

		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					title: javascriptCourseData.title,
				}),
				expect.objectContaining({
					title: typescriptCourseData.title,
				}),
			]),
		);
	});

	it("should not return soft-deleted courses", async () => {
		await createCourse({
			...defaultCourseData,
			deletedAt: new Date(),
		});

		const response = await agent.get(BASE_PATH);

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(0);
	});
});
