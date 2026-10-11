import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";

import { coursesMutations } from "@/queries/courses";
import { CourseForm } from "./CourseForm";
import type { CourseFormInput } from "./course.schema";

const DEFAULT_VALUES: CourseFormInput = {
	title: "",
	duration: {
		value: "",
		unit: "month",
	},
	fee: "",
	eligibility: "",
	description: "",
	topics: [{ topicId: "" }],
};

function CreateCourseForm() {
	const { mutateAsync } = useMutation(coursesMutations.add);

	return (
		<CourseForm
			defaultValues={DEFAULT_VALUES}
			onSubmit={(data, setError) =>
				mutateAsync(data, {
					onSuccess: () => toast.success("Topic Added Successfully"),
					onError: (error) => applyBackendErrors(error, setError),
				})
			}
		/>
	);
}

export { CreateCourseForm };
