import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "@/app";
import { Topic } from "@/models/topic.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";

const TOPICS_BASE_PATH = API_PATH.topics.base;

describe("GET /topics", () => {
	it("should reject unauthenticated requests", async () => {
		const response = await request(app).get(TOPICS_BASE_PATH);

		expect(response.status).toBe(401);
	});

	it("should return topics", async () => {
		await Topic.create([{ title: "JavaScript" }, { title: "TypeScript" }]);

		const { agent } = await createAuthenticatedAgent();

		const response = await agent.get(TOPICS_BASE_PATH);

		expect(response.status).toBe(200);

		expect(response.body).toHaveLength(2);
	});

	it("should not return soft-deleted topics", async () => {
		await Topic.create({
			title: "JavaScript",
		});

		await Topic.create({
			title: "TypeScript",
			deletedAt: new Date(),
		});
		const { agent } = await createAuthenticatedAgent();

		const response = await agent.get(TOPICS_BASE_PATH);

		expect(response.status).toBe(200);

		expect(response.body).toHaveLength(1);
		expect(response.body[0].title).toBe("JavaScript");
	});
});
