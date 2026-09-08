import type { AddStudentSchema } from "@repo/schemas/students/add.student";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Student } from "@/models/student.model";
import { studentDto } from "@/utils/dtos/studentDto";
import { handleDuplicateStudent } from "./handle-duplicate-student";

async function addStudentService({
	input,
}: AuthControllerContext<AddStudentSchema>) {
	try {
		const student = new Student(input.body);
		await student.save();

		return response(201, studentDto(student.toObject()));
	} catch (error) {
		handleDuplicateStudent(error);

		throw error;
	}
}

export { addStudentService };
