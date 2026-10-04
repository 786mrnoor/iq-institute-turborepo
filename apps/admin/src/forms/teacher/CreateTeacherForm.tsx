import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";
import { formatInputDate } from "@repo/utils/date/format/input-date.js";

import { teacherMutations } from "@/queries/teacher";
import { TeacherForm } from "./TeacherForm";
import type { TeacherFormInput } from "./teacher.schema";

const DEFAULT_VALUES: TeacherFormInput = {
	name: "",
	dob: "",
	gender: "male",
	adharNo: "",
	mobile: "",
	email: "",
	address: "",
	joinedAt: formatInputDate(new Date()),
};

function CreateTeacherForm() {
	const { mutateAsync } = useMutation(teacherMutations.add);

	return (
		<TeacherForm
			defaultValues={DEFAULT_VALUES}
			onSubmit={(data, setError) =>
				mutateAsync(data, {
					onSuccess: () => toast.success("Teacher Added Successfully"),
					onError: (error) => applyBackendErrors(error, setError),
				})
			}
		/>
	);
}

export { CreateTeacherForm };
