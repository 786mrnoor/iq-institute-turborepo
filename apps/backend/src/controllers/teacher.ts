import { addTeacherSchema } from "@repo/schemas/teachers/add.teacher";
import { deleteTeacherSchema } from "@repo/schemas/teachers/delete.teacher";
import { getTeacherSchema } from "@repo/schemas/teachers/get.teacher";
import { getTeachersSchema } from "@repo/schemas/teachers/get.teachers";
import { leftTeacherSchema } from "@repo/schemas/teachers/left.teacher";
import { updateTeacherSchema } from "@repo/schemas/teachers/update.teacher";

import { createController } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { addTeacherService } from "@/services/teacher/add-teacher.service";
import { deleteTeacherService } from "@/services/teacher/delete-teacher.service";
import { getTeacherService } from "@/services/teacher/get-teacher.service";
import { getTeachersService } from "@/services/teacher/get-teachers.service";
import { leftTeacherService } from "@/services/teacher/left-teacher.service";
import { updateTeacherService } from "@/services/teacher/update-teacher.service";

export const addTeacherController = createController({
	schema: addTeacherSchema,
	requireAuth: true,
	permission: PERMISSIONS.TEACHER_CREATE,
	handler: addTeacherService,
});

export const getTeachersController = createController({
	schema: getTeachersSchema,
	requireAuth: true,
	permission: PERMISSIONS.TEACHER_READ,
	handler: getTeachersService,
});

export const getTeacherByIdController = createController({
	schema: getTeacherSchema,
	requireAuth: true,
	permission: PERMISSIONS.TEACHER_READ,
	handler: getTeacherService,
});

export const updateTeacherController = createController({
	schema: updateTeacherSchema,
	requireAuth: true,
	permission: PERMISSIONS.TEACHER_UPDATE,
	handler: updateTeacherService,
});

export const deleteTeacherByIdController = createController({
	schema: deleteTeacherSchema,
	requireAuth: true,
	permission: PERMISSIONS.TEACHER_DELETE,
	handler: deleteTeacherService,
});

export const leftTeacherController = createController({
	schema: leftTeacherSchema,
	requireAuth: true,
	permission: PERMISSIONS.TEACHER_LEFT,
	handler: leftTeacherService,
});
