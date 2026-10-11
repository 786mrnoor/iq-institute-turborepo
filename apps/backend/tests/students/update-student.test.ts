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
describe("PATCH /students/:id", () => {
	it("should reject unauthenticated requests", async () => {
		const student = await createStudent();

		const response = await request(app)
			.patch(API_PATH.students.withId(student._id))
			.send(defaultStudentData);

		expect(response.status).toBe(401);
	});

	it("should update a student", async () => {
		const student = await createStudent();
		const updateStudentData = {
			name: "Updated name",
			dob: "2005-05-10",
			gender: "female",
			fatherName: "Updated father name",
			motherName: "Updated mother name",
			adharNo: "999999999999",
			apaarId: "999999999999",
			mobile: "9876999999",
			email: "updated@example.com",
			address: "Updated student address",
			registeredAt: new Date("2026-01-17"),
		};

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send(updateStudentData);

		expect(response.status).toBe(200);

		expect(response.body).toMatchObject({
			id: student._id.toString(),
			studentId: expect.any(String),
			name: updateStudentData.name.toUpperCase(),
			dob: expect.any(String),
			gender: updateStudentData.gender,
			fatherName: updateStudentData.fatherName.toUpperCase(),
			motherName: updateStudentData.motherName.toUpperCase(),
			adharNo: updateStudentData.adharNo,
			apaarId: updateStudentData.apaarId,
			mobile: updateStudentData.mobile,
			email: updateStudentData.email,
			address: updateStudentData.address,
			registeredAt: expect.any(String),
		});

		const updatedStudent = await Student.findById(student._id);

		expect(updatedStudent).not.toBeNull();
	});

	it("should update only the supplied fields", async () => {
		const student = await createStudent();

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send({
				name: "Updated Student",
			});

		expect(response.status).toBe(200);

		expect(response.body.name).toBe("UPDATED STUDENT");
		expect(response.body.address).toBe(student.address);
		expect(response.body.mobile).toBe(student.mobile);
	});

	it("should update optional email", async () => {
		const student = await createStudent();

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send({
				email: "updated@example.com",
			});

		expect(response.status).toBe(200);
		expect(response.body.email).toBe("updated@example.com");
	});

	it("should not update the student ID", async () => {
		const student = await createStudent();

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send({
				studentId: "STU-2026-112233",
			});

		expect(response.status).toBe(200);
		expect(response.body.studentId).not.toBe("STU-2026-112233");
	});

	it("should reject an invalid email", async () => {
		const student = await createStudent();

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send({
				email: "invalid-email",
			});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("email");
	});

	it("should reject an invalid mobile number", async () => {
		const student = await createStudent();

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send({
				mobile: "1234567890",
			});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("mobile");
	});

	it("should reject an invalid Aadhaar number", async () => {
		const student = await createStudent();

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send({
				adharNo: "12345",
			});

		expect(response.status).toBe(400);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("adharNo");
	});

	it("should return 404 when student does not exist", async () => {
		const response = await agent
			.patch(API_PATH.students.withId("507f1f77bcf86cd799439011"))
			.send({
				name: "Updated Student",
			});

		expect(response.status).toBe(404);
	});

	it("should return 400 for an invalid student id", async () => {
		const response = await agent
			.patch(API_PATH.students.withId("invalid-id"))
			.send({
				name: "Updated Student",
			});

		expect(response.status).toBe(400);
	});

	it("should reject a duplicate Aadhaar number", async () => {
		const firstStudent = await createStudent();

		const secondStudent = await createStudent({
			adharNo: "111111111111",
			studentId: "STU-2026-112233",
			apaarId: "111111111111",
		});

		const response = await agent
			.patch(API_PATH.students.withId(secondStudent._id))
			.send({
				adharNo: firstStudent.adharNo,
			});

		expect(response.status).toBe(409);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("adharNo");
	});

	it("should reject a duplicate APAAR ID", async () => {
		const firstStudent = await createStudent();

		const secondStudent = await createStudent({
			adharNo: "111111111111",
			studentId: "STU-2026-112233",
			apaarId: "111111111111",
		});

		const response = await agent
			.patch(API_PATH.students.withId(secondStudent._id))
			.send({
				apaarId: firstStudent.apaarId,
			});

		expect(response.status).toBe(409);
		expect(response.body.errors.length).toBe(1);
		expect(response.body.errors[0].path).toBe("apaarId");
	});

	it("should not update a soft-deleted student", async () => {
		const student = await createStudent({
			deletedAt: new Date(),
		});

		const response = await agent
			.patch(API_PATH.students.withId(student._id))
			.send({
				name: "Updated Student",
			});

		expect(response.status).toBe(404);
	});

	it.todo("should not update the student that is completed an enrollment");
	it.todo(
		"should only update the student's contact details that is completed an enrollment",
	);
});
