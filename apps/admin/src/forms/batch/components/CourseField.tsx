import { useSuspenseQuery } from "@tanstack/react-query";
import type { UseFormRegister } from "react-hook-form";

import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Select } from "@repo/ui/form-controls";

import { coursesQueries } from "@/queries/courses";
import type { BatchFormInput } from "../batch.schema";

type CourseFieldProps = {
	register: UseFormRegister<BatchFormInput>;
	error: string | undefined;
};

function CourseField({ register, error }: CourseFieldProps) {
	const { data: courses } = useSuspenseQuery(coursesQueries.all);

	return (
		<FieldGroup>
			<FieldLabel htmlFor="courseId">Course</FieldLabel>
			<Select
				autoFocus
				id="courseId"
				isInvalid={!!error}
				{...register("courseId")}
			>
				<option value="">Select Course</option>
				{courses.map((course) => (
					<option key={course.id} value={course.id}>
						{course.title}
					</option>
				))}
			</Select>
			<FieldError>{error}</FieldError>
		</FieldGroup>
	);
}

export { CourseField };
