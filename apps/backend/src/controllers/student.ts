import { addStudentSchema } from "@repo/schemas/students/add.student";
import { deleteStudentSchema } from "@repo/schemas/students/delete.student";
import { getStudentSchema } from "@repo/schemas/students/get.student";
import { getStudentsSchema } from "@repo/schemas/students/get.students";
import { updateStudentSchema } from "@repo/schemas/students/update.student";
import { createController } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { addStudentService } from "@/services/student/add-student.service";
import { deleteStudentService } from "@/services/student/delete-student.service";
import { getStudentService } from "@/services/student/get-student.service";
import { getStudentsService } from "@/services/student/get-students.service";
import { updateStudentService } from "@/services/student/update-student.service";

export const addStudentController = createController({
	schema: addStudentSchema,
	requireAuth: true,
	permission: PERMISSIONS.STUDENT_CREATE,
	handler: addStudentService,
});

export const getStudentsController = createController({
	schema: getStudentsSchema,
	requireAuth: true,
	permission: PERMISSIONS.STUDENT_READ,
	handler: getStudentsService,
});

export const getStudentByIdController = createController({
	schema: getStudentSchema,
	requireAuth: true,
	permission: PERMISSIONS.STUDENT_READ,
	handler: getStudentService,
});

export const updateStudentController = createController({
	schema: updateStudentSchema,
	requireAuth: true,
	permission: PERMISSIONS.STUDENT_UPDATE,
	handler: updateStudentService,
});

export const deleteStudentByIdController = createController({
	schema: deleteStudentSchema,
	requireAuth: true,
	permission: PERMISSIONS.STUDENT_DELETE,
	handler: deleteStudentService,
});
