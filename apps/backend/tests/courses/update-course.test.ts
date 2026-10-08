import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../../src/app";
import { Course } from "../../src/models/course.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createCourse, defaultCourseData } from "../helpers/course";
import { createTopic } from "../helpers/topic";

let agent: TestAgent;
beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("PATCH /courses/:id", () => {
	it("should return 401 when user is not authenticated", async () => {
		const topic = await createTopic();
		const response = await request(app)
			.patch(API_PATH.courses.withId("507f1f77bcf86cd799439011"))
			.send({ ...defaultCourseData, topics: [topic._id] });

		expect(response.status).toBe(401);
	});

	it("should update a course", async () => {
		const course = await createCourse();

		const response = await agent
			.patch(API_PATH.courses.withId(course._id))
			.send({
				...defaultCourseData,
				topics: course.topics,
				title: "Advanced Web Development",
				fee: 20000,
			});

		expect(response.status).toBe(200);

		expect(response.body).toMatchObject({
			id: course._id.toString(),
			title: "Advanced Web Development",
			fee: 20000,
		});

		const updatedCourse = await Course.findById(course._id);

		expect(updatedCourse).not.toBeNull();
		expect(updatedCourse?.title).toBe("Advanced Web Development");
		expect(updatedCourse?.fee).toBe(20000);
	});

	it("should update course topics", async () => {
		const typescript = await createTopic("TypeScript");

		const course = await createCourse();

		const response = await agent
			.patch(API_PATH.courses.withId(course._id))
			.send({
				...defaultCourseData,
				topics: [...course.topics, typescript._id],
			});

		expect(response.status).toBe(200);

		expect(response.body.topics).toEqual(
			expect.arrayContaining([
				course.topics[0]._id.toString(),
				typescript._id.toString(),
			]),
		);
	});

	it("should reject duplicate topics", async () => {
		const course = await createCourse();

		const response = await agent
			.patch(API_PATH.courses.withId(course._id))
			.send({
				topics: [course.topics[0], course.topics[0]],
			});

		expect(response.status).toBe(400);
	});

	it("should return 404 when course does not exist", async () => {
		const topic = await createTopic("JavaScript");

		const response = await agent
			.patch(API_PATH.courses.withId("507f1f77bcf86cd799439011"))
			.send({
				...defaultCourseData,
				topics: [topic._id],
			});

		expect(response.status).toBe(404);
	});

	it("should return 400 for an invalid course id", async () => {
		const response = await agent
			.patch(API_PATH.courses.withId("invalid-id"))
			.send({
				title: "Updated Course",
			});

		expect(response.status).toBe(400);
	});

	it("should reject a duplicate course title", async () => {
		const firstCourse = await createCourse();

		const course = await Course.create({
			...defaultCourseData,
			title: "Existing Course",
			topics: firstCourse.topics,
		});

		const response = await agent
			.patch(API_PATH.courses.withId(course._id))
			.send({
				...defaultCourseData,
				title: firstCourse.title,
				topics: course.topics,
			});

		expect(response.status).toBe(409);
	});

	it.todo("should not update a course that is used by a batch");
	it.todo("should not update a course that is used by an enrollment");
});
