import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { Button, ButtonGroup } from "@repo/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@repo/ui/dialog";

import { teacherMutations } from "@/queries/teacher";

type ActiveTeacherModalProps = {
	id: TeacherBaseSchema["id"];
	onClose: () => void;
};

function ActiveTeacherModal({ id, onClose }: ActiveTeacherModalProps) {
	const { mutateAsync, isPending } = useMutation(teacherMutations.active);

	async function handleActive() {
		try {
			await mutateAsync({ params: { id } });
			toast.success("The teacher is now active");
			onClose();
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong";

			toast.error(message);
		}
	}

	return (
		<Dialog show={true} onClose={onClose}>
			<DialogHeader>
				<h2 className="text-xl font-semibold">Active Teacher</h2>
			</DialogHeader>
			<DialogContent>
				<p>Are you sure you want to active this teacher?</p>
				<ButtonGroup className="justify-end">
					<Button disabled={isPending} onClick={() => onClose()}>
						Cancel
					</Button>
					<Button disabled={isPending} color="success" onClick={handleActive}>
						Active
					</Button>
				</ButtonGroup>
			</DialogContent>
		</Dialog>
	);
}

export { ActiveTeacherModal };
