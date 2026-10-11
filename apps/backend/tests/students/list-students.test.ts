import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createStudent } from "../helpers/student";

let agent: TestAgent;

beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});
describe("GET /students", () => {
	it("should reject unauthenticated requests", async () => {
		const response = await request(app).get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(401);
	});

	it("should reject request when fromDate is missing", async () => {
		const response = await agent.get(API_PATH.students.base).query({
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(400);
	});

	it("should reject request when toDate is missing", async () => {
		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
		});

		expect(response.status).toBe(400);
	});

	it("should reject an invalid fromDate", async () => {
		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "invalid-date",
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(400);
	});

	it("should reject an invalid toDate", async () => {
		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "invalid-date",
		});

		expect(response.status).toBe(400);
	});

	it("should reject when fromDate is after toDate", async () => {
		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-12-31",
			toDate: "2026-01-01",
		});

		expect(response.status).toBe(400);
	});

	it("should return students registered within the date range", async () => {
		await createStudent({
			studentId: "STU-2026-AAA111",
			registeredAt: new Date("2026-02-15"),
			adharNo: "111111111111",
			apaarId: undefined,
		});

		await createStudent({
			studentId: "STU-2026-BBB222",
			registeredAt: new Date("2026-06-15"),
			adharNo: "222222222222",
			apaarId: undefined,
		});

		await createStudent({
			studentId: "STU-2026-CCC333",
			registeredAt: new Date("2027-01-15"),
			adharNo: "333333333333",
			apaarId: undefined,
		});

		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(200);
		expect(response.body.students).toHaveLength(2);

		expect(response.body.students).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					studentId: "STU-2026-AAA111",
				}),
				expect.objectContaining({
					studentId: "STU-2026-BBB222",
				}),
			]),
		);
	});

	it("should include students registered on the date boundaries", async () => {
		await createStudent({
			studentId: "STU-2026-AAA111",
			registeredAt: new Date("2026-01-01"),
			adharNo: "111111111111",
			apaarId: undefined,
		});

		await createStudent({
			studentId: "STU-2026-BBB222",
			registeredAt: new Date("2026-12-31"),
			adharNo: "222222222222",
			apaarId: undefined,
		});

		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(200);
		expect(response.body.students).toHaveLength(2);
	});

	it("should filter students by Aadhaar number", async () => {
		const student = await createStudent({
			studentId: "STU-2026-AAA111",
			adharNo: "123456789012",
			registeredAt: new Date("2026-06-15"),
			apaarId: undefined,
		});

		await createStudent({
			studentId: "STU-2026-BBB222",
			adharNo: "987654321098",
			registeredAt: new Date("2026-06-15"),
			apaarId: undefined,
		});

		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
			adharNo: student.adharNo,
		});

		expect(response.status).toBe(200);
		expect(response.body.students).toHaveLength(1);
		expect(response.body.students[0].studentId).toBe("STU-2026-AAA111");
	});

	it("should filter students by APAAR ID", async () => {
		const student = await createStudent({
			studentId: "STU-2026-AAA111",
			adharNo: "123456789012",
			apaarId: "123456789012",
			registeredAt: new Date("2026-06-15"),
		});

		await createStudent({
			studentId: "STU-2026-BBB222",
			adharNo: "987654321098",
			apaarId: "987654321098",
			registeredAt: new Date("2026-06-15"),
		});

		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
			apaarId: student.apaarId,
		});

		expect(response.status).toBe(200);
		expect(response.body.students).toHaveLength(1);
		expect(response.body.students[0].studentId).toBe("STU-2026-AAA111");
	});

	it("should exclude soft-deleted students", async () => {
		await createStudent({
			studentId: "STU-2026-AAA111",
			registeredAt: new Date("2026-06-15"),
		});

		await createStudent({
			studentId: "STU-2026-BBB222",
			registeredAt: new Date("2026-06-15"),
			adharNo: "222222222222",
			apaarId: undefined,
			deletedAt: new Date(),
		});

		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(200);
		expect(response.body.students).toHaveLength(1);
		expect(response.body.students[0].studentId).toBe("STU-2026-AAA111");
	});

	it("should return an empty list when no students match", async () => {
		await createStudent({
			studentId: "STU-2026-AAA111",
			registeredAt: new Date("2025-06-15"),
		});

		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(200);
		expect(response.body.students).toHaveLength(0);
	});

	it("should use the default pagination values", async () => {
		await Promise.all(
			Array.from({ length: 12 }, (_, index) =>
				createStudent({
					studentId: `STU-2026-${index.toString().padStart(6, "0")}`,
					adharNo: index.toString().padStart(12, "0"),
					apaarId: undefined,
				}),
			),
		);

		const response = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
		});

		expect(response.status).toBe(200);
		expect(response.body.students).toHaveLength(10);
	});

	it("should paginate students using page and limit", async () => {
		await Promise.all(
			Array.from({ length: 15 }, (_, index) =>
				createStudent({
					studentId: `STU-2026-${index.toString().padStart(6, "0")}`,
					adharNo: index.toString().padStart(12, "0"),
					apaarId: undefined,
				}),
			),
		);

		const page1 = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
			page: 1,
			limit: 10,
		});

		expect(page1.status).toBe(200);
		expect(page1.body.students).toHaveLength(10);

		const page2 = await agent.get(API_PATH.students.base).query({
			fromDate: "2026-01-01",
			toDate: "2026-12-31",
			page: 2,
			limit: 10,
		});

		expect(page2.status).toBe(200);
		expect(page2.body.students).toHaveLength(5);
	});
});
