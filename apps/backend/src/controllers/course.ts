import { createCourseSchema } from "@repo/schemas/course/create.course";
import { deleteCourseSchema } from "@repo/schemas/course/delete.course";
import { getCourseSchema } from "@repo/schemas/course/get.course";
import { updateCourseSchema } from "@repo/schemas/course/update.course";
import { createController } from "@/lib/controller";
import { addCourseService } from "@/services/course/add-course.service";
import { deleteCourseService } from "@/services/course/delete-course.service";
import { getCourseService } from "@/services/course/get-course.service";
import { getCoursesService } from "@/services/course/get-courses.service";
import { updateCourseService } from "@/services/course/update-course.service";

export const addCourseController = createController({
	schema: createCourseSchema,
	requireAuth: true,
	handler: addCourseService,
});

export const getCoursesController = createController({
	schema: {},
	requireAuth: true,
	handler: getCoursesService,
});

export const getCourseController = createController({
	schema: getCourseSchema,
	requireAuth: true,
	handler: getCourseService,
});

export const updateCourseController = createController({
	schema: updateCourseSchema,
	requireAuth: true,
	handler: updateCourseService,
});

export const deleteCourseController = createController({
	schema: deleteCourseSchema,
	requireAuth: true,
	handler: deleteCourseService,
});
