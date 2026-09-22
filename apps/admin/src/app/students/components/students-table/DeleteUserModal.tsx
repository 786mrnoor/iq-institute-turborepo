import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import { ConfirmModal } from "@repo/ui/modals/confirm";

import { studentMutations } from "@/queries/students";

type DeleteStudentModalProps = {
	id: StudentBaseSchema["id"];
	onCancel: () => void;
};

function DeleteStudentModal({ id, onCancel }: DeleteStudentModalProps) {
	const { mutate, isPending } = useMutation(studentMutations.delete);

	return (
		<ConfirmModal
			title="Delete Student"
			message="Are you sure you want to delete this student?"
			confirmText="Delete"
			onCancel={onCancel}
			onConfirm={() =>
				mutate(id, {
					onSuccess: () => toast.success("Student Deleted Successfully"),
					onError: (error) => toast.error(error.message),
					onSettled: () => onCancel(),
				})
			}
			isPending={isPending}
		/>
	);
}

export { DeleteStudentModal };
