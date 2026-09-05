import type { CreateCourseSchema } from "@repo/schemas/course/create.course";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Course } from "@/models/course.model";
import { courseDto } from "@/utils/dtos/courseDto";
import { checkTopics } from "./check-topics";

async function addCourseService({
	input,
}: AuthControllerContext<CreateCourseSchema>) {
	try {
		const course = input.body;
		await checkTopics(course.topics);

		const newCourse = new Course(course);
		await newCourse.save();

		return response(201, courseDto(newCourse.toObject()));
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

export { addCourseService };
