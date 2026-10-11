import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { Student } from "@/models/student.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createObjectId } from "../helpers/objectId";
import { createStudent } from "../helpers/student";

let agent: TestAgent;

beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("DELETE /students/:id", () => {
	it("should reject unauthenticated requests", async () => {
		const response = await request(app).delete(
			API_PATH.students.withId(createObjectId()),
		);

		expect(response.status).toBe(401);
	});

	it("should soft-delete a student", async () => {
		const student = await createStudent();

		const response = await agent.delete(API_PATH.students.withId(student._id));

		expect(response.status).toBe(204);

		const deletedStudent = await Student.findById(student._id);

		expect(deletedStudent).not.toBeNull();
		expect(deletedStudent?.deletedAt).not.toBeNull();
	});

	it("should return 400 when student does not exist", async () => {
		const response = await agent.delete(
			API_PATH.students.withId("507f1f77bcf86cd799439011"),
		);

		expect(response.status).toBe(400);
	});

	it("should return 400 for an invalid student id", async () => {
		const response = await agent.delete(API_PATH.students.withId("invalid-id"));

		expect(response.status).toBe(400);
	});

	it.todo("should not allow deleting an already deleted student");
	it.todo("should not delete the student that is completed an enrollment");
});
