import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "@/app";
import { Topic } from "@/models/topic.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createObjectId } from "../helpers/objectId";
import { createTopic } from "../helpers/topic";

describe("DELETE /topics/:id", () => {
	it("should reject unauthenticated requests", async () => {
		const id = createObjectId();
		const response = await request(app).delete(API_PATH.topics.withId(id));

		expect(response.status).toBe(401);
	});

	it("should soft delete a topic", async () => {
		const topic = await createTopic();
		const { agent } = await createAuthenticatedAgent();

		const response = await agent.delete(API_PATH.topics.withId(topic._id));

		expect(response.status).toBe(200);

		const deletedTopic = await Topic.findById(topic._id);

		expect(deletedTopic).not.toBeNull();
		expect(deletedTopic?.deletedAt).toBeInstanceOf(Date);
	});

	it("should return 404 when deleting a nonexistent topic", async () => {
		const id = createObjectId();
		const { agent } = await createAuthenticatedAgent();

		const response = await agent.delete(API_PATH.topics.withId(id));

		expect(response.status).toBe(404);
	});

	it("should not return a deleted topic from GET", async () => {
		const topic = await createTopic();
		const topicId = topic._id.toString();
		const { agent } = await createAuthenticatedAgent();

		await agent.delete(API_PATH.topics.withId(topicId));

		const response = await agent.get(API_PATH.topics.base);

		expect(response.status).toBe(200);

		expect(
			response.body.some((item: { id: string }) => item.id === topicId),
		).toBe(false);
	});

	it("should allow creating the same title after soft deletion", async () => {
		const topic = await createTopic();
		const { agent } = await createAuthenticatedAgent();

		await agent.delete(API_PATH.topics.withId(topic._id));

		const response = await agent.post(API_PATH.topics.base).send({
			title: topic.title,
		});

		expect(response.status).toBe(201);
		expect(response.body.title).toBe(topic.title);
	});
});
