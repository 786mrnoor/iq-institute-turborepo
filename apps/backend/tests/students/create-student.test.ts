import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { beforeEach, describe, expect, it } from "vitest";

import app from "@/app";
import { Student } from "@/models/student.model";
import { API_PATH } from "../helpers/api-path";
import { createAuthenticatedAgent } from "../helpers/auth";
import { createStudent, defaultStudentData } from "../helpers/student";

let agent: TestAgent;

beforeEach(async () => {
	const result = await createAuthenticatedAgent();
	agent = result.agent;
});

describe("POST /students", () => {
	it("should reject unauthenticated requests", async () => {
		const response = await request(app)
			.post(API_PATH.students.base)
			.send(defaultStudentData);

		expect(response.status).toBe(401);
	});

	it("should create a student", async () => {
		const studentData = {
			...defaultStudentData,
			adharNo: "123456789012",
			apaarId: "987654321012",
		};

		const response = await agent.post(API_PATH.students.base).send(studentData);

		expect(response.status).toBe(201);

		expect(response.body).toMatchObject({
			studentId: expect.any(String),
			name: studentData.name.toUpperCase(),
			dob: expect.any(String),
			gender: "male",
			fatherName: studentData.fatherName.toUpperCase(),
			motherName: studentData.motherName.toUpperCase(),
			adharNo: studentData.adharNo,
			apaarId: studentData.apaarId,
			mobile: studentData.mobile,
			email: studentData.email,
			address: studentData.address,
			registeredAt: expect.any(String),
		});

		const student = await Student.findOne({
			studentId: response.body.studentId,
		});

		expect(student).not.toBeNull();
		expect(student?.name).toBe("JOHN DOE");
	});

	it("should uppercase name and parents' names", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			dob: "2005-05-15",
			name: "john doe",
			fatherName: "robert doe",
			motherName: "jane doe",
		});

		expect(response.status).toBe(201);

		expect(response.body.name).toBe("JOHN DOE");
		expect(response.body.fatherName).toBe("ROBERT DOE");
		expect(response.body.motherName).toBe("JANE DOE");
	});

	it("should create a student without optional fields", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			studentId: "STU-2026-ABC123",
			adharNo: "123456789012",
			apaarId: undefined,
			email: undefined,
		});

		expect(response.status).toBe(201);

		expect(response.body.email).toBeUndefined();
		expect(response.body.apaarId).toBeUndefined();
	});

	it("should create a student without the passed student ID", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			studentId: "STU-2026-ABC123",
		});

		expect(response.status).toBe(201);
		expect(response.body.studentId).not.toBe("STU-2026-ABC123");
	});

	it("should reject a name shorter than 3 characters", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			name: "AB",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("name");
	});

	it("should reject an invalid date of birth", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			dob: "not-a-date",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("dob");
	});

	it("should reject a datetime date of birth", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			dob: "2020-01-01T06:15:00Z",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("dob");
	});

	it("should reject an invalid gender", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			gender: "other",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("gender");
	});

	it("should reject an invalid Aadhaar number", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			adharNo: "12345678901",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("adharNo");
	});

	it("should reject an invalid APAAR ID", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			apaarId: "1234567890",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("apaarId");
	});

	it("should reject an invalid mobile number", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			mobile: "1234567890",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("mobile");
	});

	it("should reject an invalid email", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			email: "invalid-email",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("email");
	});

	it("should reject an address shorter than 5 characters", async () => {
		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			address: "abcd",
		});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("address");
	});

	it("should reject a duplicate Aadhaar number for an active student", async () => {
		await createStudent({
			adharNo: "123456789012",
		});

		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			studentId: "STU-2026-XYZ789",
			adharNo: "123456789012",
			apaarId: "222222222222",
		});

		expect(response.status).toBe(409);
	});

	it("should reject a duplicate APAAR ID for an active student", async () => {
		await createStudent({
			apaarId: "987654321012",
		});

		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			studentId: "STU-2026-XYZ789",
			adharNo: "111111111111",
			apaarId: "987654321012",
		});

		expect(response.status).toBe(409);
	});

	it.todo("should reject a duplicate student ID", async () => {
		await createStudent({
			studentId: "STU-2026-ABC123",
		});

		const response = await agent.post(API_PATH.students.base).send({
			...defaultStudentData,
			studentId: "STU-2026-ABC123",
			adharNo: "111111111111",
			apaarId: "222222222222",
		});

		expect(response.status).toBe(409);
	});
});
