import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { Course } from "@/models/course.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { defaultCourseData } from "../helpers/course";
import { createTopic } from "../helpers/topic";

const BASE_PATH = API_PATH.courses.base;

let agent: TestAgent;
beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("POST /courses", () => {
	it("should return 401 when user is not authenticated", async () => {
		const topic = await createTopic();

		const response = await request(app)
			.post(BASE_PATH)
			.send({
				...defaultCourseData,
				topics: [topic._id.toString()],
			});

		expect(response.status).toBe(401);
	});

	it("should create a course", async () => {
		const topic = await createTopic();

		const courseData = {
			...defaultCourseData,
			topics: [topic._id],
		};

		const response = await agent.post(BASE_PATH).send(courseData);

		expect(response.status).toBe(201);

		expect(response.body).toMatchObject({
			title: courseData.title,
			duration: courseData.duration,
			eligibility: courseData.eligibility,
			fee: courseData.fee,
			description: courseData.description,
			topics: [topic._id.toString()],
		});

		const course = await Course.findOne({
			title: courseData.title,
		});

		expect(course).not.toBeNull();
		expect(course?.topics.map(String)).toEqual([topic._id.toString()]);
	});

	it("should create a course without description", async () => {
		const topic = await createTopic();

		const response = await agent.post(BASE_PATH).send({
			...defaultCourseData,
			topics: [topic._id.toString()],
			description: undefined,
		});
		expect(response.status).toBe(201);

		expect(response.body.description).toBeNull();
	});

	it("should reject a course without topics", async () => {
		const response = await agent.post(BASE_PATH).send({
			...defaultCourseData,
			topics: [],
		});

		expect(response.status).toBe(400);
	});

	it("should reject duplicate topics", async () => {
		const topic = await createTopic();

		const response = await agent.post(BASE_PATH).send({
			...defaultCourseData,
			topics: [topic._id, topic._id],
		});

		expect(response.status).toBe(400);
	});

	it("should reject a course with an invalid topic id", async () => {
		const response = await agent.post(BASE_PATH).send({
			...defaultCourseData,
			topics: ["507f1f77bcf86cd799439011"],
		});

		expect(response.status).toBe(400);
	});

	it("should reject a duplicate course title", async () => {
		const topic = await createTopic();

		const courseData = {
			...defaultCourseData,
			title: topic.title,
			topics: [topic._id],
		};

		const firstResponse = await agent.post(BASE_PATH).send(courseData);

		expect(firstResponse.status).toBe(201);

		const secondResponse = await agent.post(BASE_PATH).send(courseData);

		expect(secondResponse.status).toBe(409);
	});
});
