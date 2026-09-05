import type { UpdateCourseSchema } from "@repo/schemas/course/update.course";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Course } from "@/models/course.model";
import { courseDto } from "@/utils/dtos/courseDto";
import { checkTopics } from "./check-topics";

async function updateCourseService({
	input,
}: AuthControllerContext<UpdateCourseSchema>) {
	try {
		const course = input.body;
		const id = input.params.id;

		await checkTopics(course.topics);

		const udpateCourse = await Course.findOneAndUpdate(
			{ _id: id, deletedAt: null },
			course,
			{
				returnDocument: "after",
				runValidators: true,
			},
		);
		if (!udpateCourse) {
			throw new AppError(404, "Course could not be found.");
		}

		return response(200, courseDto(udpateCourse.toObject()));
	} catch (error) {
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			error.code === 11000
		) {
			throw new AppError(409, "course is already in use.", {
				path: "title",
				message: "Please enter a different course title",
			});
		}
		throw error;
	}
}

export { updateCourseService };
