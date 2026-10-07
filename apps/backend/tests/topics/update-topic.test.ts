import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "@/app";
import { Topic } from "@/models/topic.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createTopic } from "../helpers/topic";

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
		const { agent } = await createAuthenticatedAgent();

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
		const { agent } = await createAuthenticatedAgent();

		const response = await agent
			.patch(API_PATH.topics.withId("invalid-id"))
			.send({
				title: "TypeScript",
			});

		expect(response.status).toBe(400);
	});

	it("should reject an invalid title", async () => {
		const topic = await createTopic();
		const { agent } = await createAuthenticatedAgent();

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
		const { agent } = await createAuthenticatedAgent();

		const response = await agent
			.patch(API_PATH.topics.withId(topic2._id))
			.send({
				title: topic1.title,
			});

		expect(response.status).toBe(409);
	});

	it("should return 404 for a nonexistent topic", async () => {
		const mongoose = await import("mongoose");

		const id = new mongoose.Types.ObjectId();
		const { agent } = await createAuthenticatedAgent();

		const response = await agent.patch(API_PATH.topics.withId(id)).send({
			title: "TypeScript",
		});

		expect(response.status).toBe(404);
	});
});
