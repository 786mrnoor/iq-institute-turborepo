import type { Types } from "mongoose";

import { Course, type TCourse } from "@/models/course.model";
import { createTopic } from "./topic";

export type DefaultCourseType = Omit<
	TCourse,
	"topics" | "_id" | "createdAt" | "updatedAt"
> & {
	topics?: Types.ObjectId[];
};
export const defaultCourseData = {
	title: "Web Development",
	duration: {
		value: 6,
		unit: "month" as const,
	},
	eligibility: "12th pass",
	fee: 15000,
	description: "Full stack web development course",
};

async function createCourse(
	courseData: DefaultCourseType = { ...defaultCourseData },
) {
	if (!courseData.topics) {
		const topic = await createTopic("JavaScript");
		courseData.topics = [topic._id];
	}

	const course = await Course.create(courseData);
	return course.toObject();
}

export { createCourse };
