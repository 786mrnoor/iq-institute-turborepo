import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { ConfirmModal } from "@repo/ui/modals/confirm";

import { coursesMutations } from "@/queries/courses";

type DeleteCourseModalProps = {
	id: CourseBaseSchema["id"];
	onCancel: () => void;
};

function DeleteCourseModal({ id, onCancel }: DeleteCourseModalProps) {
	const { mutate, isPending } = useMutation(coursesMutations.delete);

	return (
		<ConfirmModal
			title="Delete Course"
			message="Are you sure you want to delete this course?"
			confirmText="Delete"
			onCancel={onCancel}
			onConfirm={() =>
				mutate(id, {
					onSuccess: () => toast.success("Course Deleted Successfully"),
					onError: (error) => toast.error(error.message),
					onSettled: () => onCancel(),
				})
			}
			isPending={isPending}
		/>
	);
}

export { DeleteCourseModal };
