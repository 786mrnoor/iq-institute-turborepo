import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";

import { teacherMutations, teacherQueries } from "@/queries/teacher";
import { TeacherForm } from "./TeacherForm";

type EditTeacherFormProps = {
	id: TeacherBaseSchema["id"];
};

function EditTeacherForm({ id }: EditTeacherFormProps) {
	const { data } = useSuspenseQuery(teacherQueries.detail(id));

	const [defaultTeacher, setDefaultTeacher] = useState(data);

	const { mutateAsync } = useMutation(teacherMutations.update);

	function onSuccess(newTeacher: TeacherBaseSchema) {
		toast.success("Teacher Updated Successfully");
		setDefaultTeacher(newTeacher);
	}

	return (
		<TeacherForm
			defaultValues={{
				...defaultTeacher,
				dob: defaultTeacher.dob.toISOString().slice(0, 10),
				joinedAt: defaultTeacher.joinedAt.toISOString().slice(0, 10),
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

export { EditTeacherForm };
