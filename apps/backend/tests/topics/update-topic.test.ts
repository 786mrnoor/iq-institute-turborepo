import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { Topic } from "@/models/topic.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createCourse } from "../helpers/course";
import { createObjectId } from "../helpers/objectId";
import { createTopic } from "../helpers/topic";

let agent: TestAgent;
beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("PATCH /topics/:id", () => {
	it("should reject unauthenticated requests", async () => {
		const topic = await createTopic();
		const response = await request(app)
			.patch(API_PATH.topics.withId(topic._id))
			.send({
				title: "TypeScript",
			});

		expect(response.status).toBe(401);
	});

	it("should update a topic", async () => {
		const topic = await createTopic();

		const response = await agent.patch(API_PATH.topics.withId(topic._id)).send({
			title: "TypeScript",
		});

		expect(response.status).toBe(200);

		expect(response.body).toMatchObject({
			title: "TypeScript",
		});

		const updatedTopic = await Topic.findById(topic._id);

		expect(updatedTopic?.title).toBe("TypeScript");
	});

	it("should reject an invalid topic id", async () => {
		const response = await agent
			.patch(API_PATH.topics.withId("invalid-id"))
			.send({
				title: "TypeScript",
			});

		expect(response.status).toBe(400);
	});

	it("should reject an invalid title", async () => {
		const topic = await createTopic();
		const response = await agent.patch(API_PATH.topics.withId(topic._id)).send({
			title: "JS",
		});

		expect(response.status).toBe(400);
	});

	it("should reject updating to an existing active title", async () => {
		const topic1 = await Topic.create({
			title: "JavaScript",
		});

		const topic2 = await Topic.create({
			title: "TypeScript",
		});

		const response = await agent
			.patch(API_PATH.topics.withId(topic2._id))
			.send({
				title: topic1.title,
			});

		expect(response.status).toBe(409);
	});

	it("should return 404 for a nonexistent topic", async () => {
		const id = createObjectId();

		const response = await agent.patch(API_PATH.topics.withId(id)).send({
			title: "TypeScript",
		});

		expect(response.status).toBe(404);
	});

	it("should not update a topic that is used by a course", async () => {
		const course = await createCourse();

		const response = await agent
			.patch(API_PATH.topics.withId(course.topics[0]._id))
			.send({
				title: "Updated JavaScript",
			});

		expect(response.status).toBe(409);

		const existingTopic = await Topic.findById(course.topics[0]._id);

		expect(existingTopic).not.toBeNull();
		expect(existingTopic?.title).toBe("JavaScript");
	});
});
