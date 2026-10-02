import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";

import { studentMutations, studentQueries } from "@/queries/students";
import { StudentForm } from "./StudentForm";

type EditStudentFormProps = {
	id: StudentBaseSchema["id"];
};

function EditStudentForm({ id }: EditStudentFormProps) {
	const { data } = useSuspenseQuery(studentQueries.detail(id));

	const [defaultStudent, setDefaultStudent] = useState(data);

	const { mutateAsync } = useMutation(studentMutations.update);

	function onSuccess(newStudent: StudentBaseSchema) {
		toast.success("Student Updated Successfully");
		setDefaultStudent(newStudent);
	}

	return (
		<StudentForm
			defaultValues={{
				...defaultStudent,
				dob: defaultStudent.dob.toISOString().slice(0, 10),
				registeredAt: defaultStudent.registeredAt.toISOString().slice(0, 10),
			}}
			onSubmit={async (data, setError) => {
				await mutateAsync(
					{ body: data, params: { id } },
					{
						onSuccess,
						onError: (error) => applyBackendErrors(error, setError),
					},
				);
			}}
		/>
	);
}

export { EditStudentForm };
