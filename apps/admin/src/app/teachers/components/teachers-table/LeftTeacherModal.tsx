import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { Dialog, DialogContent, DialogHeader } from "@repo/ui/dialog";

import { TeacherLeftForm } from "@/forms/teacher/left-form/LeftForm";

type LeftTeacherModalProps = {
	id: TeacherBaseSchema["id"];
	onClose: () => void;
};

function LeftTeacherModal({ id, onClose }: LeftTeacherModalProps) {
	return (
		<Dialog show={true} onClose={onClose}>
			<DialogHeader>
				<h2 className="text-xl font-semibold text-red">Left Teacher</h2>
			</DialogHeader>
			<DialogContent>
				<TeacherLeftForm id={id} onClose={onClose} />
			</DialogContent>
		</Dialog>
	);
}

export { LeftTeacherModal };
