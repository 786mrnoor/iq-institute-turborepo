import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../src/app";

describe("GET /health", () => {
	it("should return server health status", async () => {
		const response = await request(app).get("/api/health");

		expect(response.status).toBe(200);

		expect(response.body.message).toBe("OK");
		expect(response.body.timestamp).toBeGreaterThanOrEqual(0);
	});
});
