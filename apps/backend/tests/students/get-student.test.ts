import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createObjectId } from "../helpers/objectId";
import { createStudent } from "../helpers/student";

let agent: TestAgent;

beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});
describe("GET /students/:id", () => {
	it("should reject unauthenticated requests", async () => {
		const id = createObjectId();
		const response = await request(app).get(API_PATH.students.withId(id));

		expect(response.status).toBe(401);
	});

	it("should return a student by id", async () => {
		const student = await createStudent();

		const response = await agent.get(API_PATH.students.withId(student._id));

		expect(response.status).toBe(200);

		expect(response.body).toMatchObject({
			id: student._id.toString(),
			studentId: student.studentId,
			name: student.name.toUpperCase(),
			gender: "male",
			adharNo: student.adharNo,
		});
	});

	it("should return 404 when student does not exist", async () => {
		const response = await agent.get(
			API_PATH.students.withId(createObjectId()),
		);

		expect(response.status).toBe(404);
	});

	it("should return 400 for an invalid student id", async () => {
		const response = await agent.get(API_PATH.students.withId("invalid-id"));

		expect(response.status).toBe(400);
	});

	it("should not return a soft-deleted student", async () => {
		const student = await createStudent({
			deletedAt: new Date(),
		});

		const response = await agent.get(API_PATH.students.withId(student._id));

		expect(response.status).toBe(404);
	});
});
