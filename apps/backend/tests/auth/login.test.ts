import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../src/app";
import { API_PATH } from "../helpers/api-path";
import { createTestUser } from "../helpers/auth";

describe("POST /auth/login", () => {
	it("should login with valid credentials", async () => {
		const { email, password } = await createTestUser();

		const response = await request(app)
			.post(API_PATH.auth.login)
			.send({ email, password });

		expect(response.status).toBe(200);

		expect(response.body.message).toBeDefined();

		expect(response.headers["set-cookie"]).toBeDefined();
		expect(response.headers["set-cookie"].length).toBeGreaterThan(0);
	});

	describe("invalid credentials", () => {
		it("should reject an incorrect password", async () => {
			const { email } = await createTestUser();

			const response = await request(app).post(API_PATH.auth.login).send({
				email,
				password: "WrongPassword@123",
			});

			expect(response.status).toBe(401);
		});

		it("should reject an unknown email", async () => {
			const { password } = await createTestUser();

			const response = await request(app).post(API_PATH.auth.login).send({
				email: "unknown@example.com",
				password,
			});

			expect(response.status).toBe(401);
		});
	});

	describe("validation", () => {
		it("should reject a missing email", async () => {
			const response = await request(app).post(API_PATH.auth.login).send({
				password: "WrongPassword@123",
			});

			expect(response.status).toBe(400);
		});

		it("should reject a missing password", async () => {
			const response = await request(app).post(API_PATH.auth.login).send({
				email: "test@example.com",
			});

			expect(response.status).toBe(400);
		});

		it("should reject an invalid email", async () => {
			const { password } = await createTestUser();

			const response = await request(app).post(API_PATH.auth.login).send({
				email: "not-an-email",
				password,
			});

			expect(response.status).toBe(400);
		});

		it("should reject an empty request body", async () => {
			const response = await request(app).post(API_PATH.auth.login).send({});

			expect(response.status).toBe(400);
		});
	});
});
