import { createCourseSchema } from "@repo/schemas/course/create.course";
import { deleteCourseSchema } from "@repo/schemas/course/delete.course";
import { getCourseSchema } from "@repo/schemas/course/get.course";
import { updateCourseSchema } from "@repo/schemas/course/update.course";
import { createController } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { addCourseService } from "@/services/course/add-course.service";
import { deleteCourseService } from "@/services/course/delete-course.service";
import { getCourseService } from "@/services/course/get-course.service";
import { getCoursesService } from "@/services/course/get-courses.service";
import { revalidateCourse } from "@/services/course/revalidate-course";
import { updateCourseService } from "@/services/course/update-course.service";

export const addCourseController = createController({
	schema: createCourseSchema,
	requireAuth: true,
	permission: PERMISSIONS.COURSE_CREATE,
	async handler(ctx) {
		const result = await addCourseService(ctx);

		await revalidateCourse([result.data.id]);

		return result;
	},
});

export const getCoursesController = createController({
	schema: {},
	requireAuth: false,
	handler: getCoursesService,
});

export const getCourseController = createController({
	schema: getCourseSchema,
	requireAuth: false,
	handler: getCourseService,
});

export const updateCourseController = createController({
	schema: updateCourseSchema,
	requireAuth: true,
	permission: PERMISSIONS.COURSE_UPDATE,
	async handler(ctx) {
		const result = await updateCourseService(ctx);

		await revalidateCourse([result.data.id]);

		return result;
	},
});

export const deleteCourseController = createController({
	schema: deleteCourseSchema,
	requireAuth: true,
	permission: PERMISSIONS.COURSE_DELETE,
	async handler(ctx) {
		const result = await deleteCourseService(ctx);

		await revalidateCourse([ctx.input.params.id]);

		return result;
	},
});
