import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { ConfirmModal } from "@repo/ui/modals/confirm";

import { teacherMutations } from "@/queries/teacher";

type DeleteTeacherModalProps = {
	id: TeacherBaseSchema["id"];
	onCancel: () => void;
};

function DeleteTeacherModal({ id, onCancel }: DeleteTeacherModalProps) {
	const { mutate, isPending } = useMutation(teacherMutations.delete);

	return (
		<ConfirmModal
			title="Delete Teacher"
			message="Are you sure you want to delete this teacher?"
			confirmText="Delete"
			onCancel={onCancel}
			onConfirm={() =>
				mutate(id, {
					onSuccess: () => toast.success("Teacher Deleted Successfully"),
					onError: (error) => toast.error(error.message),
					onSettled: () => onCancel(),
				})
			}
			isPending={isPending}
		/>
	);
}

export { DeleteTeacherModal };
