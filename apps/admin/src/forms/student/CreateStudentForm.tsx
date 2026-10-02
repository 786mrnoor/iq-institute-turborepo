import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";
import { formatInputDate } from "@repo/utils/date/format/input-date.js";

import { studentMutations } from "@/queries/students";
import { StudentForm } from "./StudentForm";
import type { StudentFormInput } from "./student.schema";

const DEFAULT_VALUES: StudentFormInput = {
	name: "",
	dob: "",
	gender: "male",
	fatherName: "",
	motherName: "",
	adharNo: "",
	apaarId: "",
	mobile: "",
	email: "",
	address: "",
	registeredAt: formatInputDate(new Date()),
};

function CreateStudentForm() {
	const { mutateAsync } = useMutation(studentMutations.add);

	return (
		<StudentForm
			defaultValues={DEFAULT_VALUES}
			onSubmit={(data, setError) =>
				mutateAsync(data, {
					onSuccess: () => toast.success("Student Added Successfully"),
					onError: (error) => applyBackendErrors(error, setError),
				})
			}
		/>
	);
}

export { CreateStudentForm };
