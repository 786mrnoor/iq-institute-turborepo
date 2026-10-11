import { Student, type TStudent } from "@/models/student.model";

export type DefaultStudentType = Omit<
	TStudent,
	"_id" | "createdAt" | "updatedAt" | "dob"
> & { dob: string };

export const defaultStudentData: DefaultStudentType = {
	studentId: "STU-2026-ABC123",
	name: "John Doe",
	dob: "2005-05-15",
	gender: "male",
	fatherName: "Robert Doe",
	motherName: "Jane Doe",
	adharNo: "123456789012",
	apaarId: "987654321012",
	mobile: "9876543210",
	email: "john.doe@example.com",
	address: "123 Main Street, Lucknow",
	registeredAt: new Date("2026-01-15"),
	deletedAt: null,
};

export async function createStudent(
	studentData: Partial<DefaultStudentType> = {},
) {
	const student = await Student.create({
		...defaultStudentData,
		...studentData,
	});

	return student.toObject();
}
