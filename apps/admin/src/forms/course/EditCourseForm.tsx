import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";

import { coursesMutations, coursesQueries } from "@/queries/courses";
import { CourseForm } from "./CourseForm";

type EditCourseFormProps = {
	id: CourseBaseSchema["id"];
};

function EditCourseForm({ id }: EditCourseFormProps) {
	const { data: course } = useSuspenseQuery(coursesQueries.detail(id));

	const [defaultCourse, setDefaultCourse] = useState(course);

	const { mutateAsync } = useMutation(coursesMutations.update);

	function onSuccess(newCourse: CourseBaseSchema) {
		toast.success("Course Updated Successfully");
		setDefaultCourse(newCourse);
	}

	return (
		<CourseForm
			defaultValues={{
				...defaultCourse,
				topics: defaultCourse.topics.map((t) => ({
					topicId: t,
				})),
			}}
			onSubmit={async (data, setError) => {
				await mutateAsync(
					{ body: data, params: { id: course.id } },
					{
						onSuccess,
						onError: (error) => applyBackendErrors(error, setError),
					},
				);
			}}
		/>
	);
}

export { EditCourseForm };
