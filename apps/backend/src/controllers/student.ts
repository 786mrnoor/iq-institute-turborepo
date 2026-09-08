import { addStudentSchema } from "@repo/schemas/students/add.student";
import { deleteStudentSchema } from "@repo/schemas/students/delete.student";
import { getStudentSchema } from "@repo/schemas/students/get.student";
import { getStudentsSchema } from "@repo/schemas/students/get.students";
import { updateStudentSchema } from "@repo/schemas/students/update.student";
import { createController } from "@/lib/controller";
import { addStudentService } from "@/services/student/add-student.service";
import { deleteStudentService } from "@/services/student/delete-student.service";
import { getStudentService } from "@/services/student/get-student.service";
import { getStudentsService } from "@/services/student/get-students.service";
import { updateStudentService } from "@/services/student/update-student.service";

export const addStudentController = createController({
	schema: addStudentSchema,
	requireAuth: true,
	handler: addStudentService,
});

export const getStudentsController = createController({
	schema: getStudentsSchema,
	requireAuth: true,
	handler: getStudentsService,
});

export const getStudentByIdController = createController({
	schema: getStudentSchema,
	requireAuth: true,
	handler: getStudentService,
});

export const updateStudentController = createController({
	schema: updateStudentSchema,
	requireAuth: true,
	handler: updateStudentService,
});

export const deleteStudentByIdController = createController({
	schema: deleteStudentSchema,
	requireAuth: true,
	handler: deleteStudentService,
});
