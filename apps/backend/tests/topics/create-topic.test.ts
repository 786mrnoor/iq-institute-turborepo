import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { Topic } from "@/models/topic.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";

const BASE_PATH = API_PATH.topics.base;

let agent: TestAgent;
beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("POST /topics", () => {
	it("should reject unauthenticated requests", async () => {
		const response = await request(app).post(BASE_PATH).send({
			title: "JavaScript",
		});

		expect(response.status).toBe(401);
	});

	it("should create a topic", async () => {
		const response = await agent.post(BASE_PATH).send({
			title: "JavaScript",
		});

		expect(response.status).toBe(201);

		expect(response.body).toMatchObject({
			title: "JavaScript",
			deletedAt: null,
		});

		expect(response.body.id).toBeDefined();
		expect(response.body.createdAt).toBeDefined();
		expect(response.body.updatedAt).toBeDefined();

		const topic = await Topic.findOne({
			title: "JavaScript",
		});

		expect(topic).not.toBeNull();
	});

	it("should trim the title", async () => {
		const response = await agent.post(BASE_PATH).send({
			title: "   JavaScript   ",
		});

		expect(response.status).toBe(201);
		expect(response.body.title).toBe("JavaScript");

		const topic = await Topic.findById(response.body.id).lean();

		expect(topic).not.toBeNull();
		expect(topic?.title).toBe("JavaScript");
	});

	it("should reject duplicate active topics", async () => {
		await agent.post(BASE_PATH).send({
			title: "JavaScript",
		});

		const response = await agent.post(BASE_PATH).send({
			title: "JavaScript",
		});

		expect(response.status).toBe(409);
	});

	it("should reject a title shorter than 3 characters", async () => {
		const response = await agent.post(BASE_PATH).send({
			title: "JS",
		});

		expect(response.status).toBe(400);
	});

	it("should reject a missing title", async () => {
		const response = await agent.post(BASE_PATH).send({});

		expect(response.status).toBe(400);
	});
});
