import { useSuspenseQuery } from "@tanstack/react-query";
import type { UseFormRegister } from "react-hook-form";

import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Select } from "@repo/ui/form-controls";

import { teacherQueries } from "@/queries/teacher";
import type { BatchFormInput } from "../batch.schema";

type TeacherFieldProps = {
	register: UseFormRegister<BatchFormInput>;
	error: string | undefined;
};

function TeacherField({ register, error }: TeacherFieldProps) {
	const { data } = useSuspenseQuery(
		teacherQueries.list({ status: "active", page: 1, limit: 100 }),
	);

	return (
		<FieldGroup>
			<FieldLabel htmlFor="teacherId">Teacher</FieldLabel>
			<Select
				autoFocus
				id="teacherId"
				isInvalid={!!error}
				{...register("teacherId")}
			>
				<option value="">Select Teacher</option>
				{data.teachers.map((teacher) => (
					<option key={teacher.id} value={teacher.id}>
						{teacher.name}
					</option>
				))}
			</Select>
			<FieldError>{error}</FieldError>
		</FieldGroup>
	);
}

export { TeacherField };
