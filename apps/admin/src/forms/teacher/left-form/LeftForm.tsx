import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { Button, ButtonGroup } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input } from "@repo/ui/form-controls";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";
import { formatInputDate } from "@repo/utils/date/format/input-date.js";

import { teacherMutations } from "@/queries/teacher";
import {
	type LeftTeacherFormData,
	type LeftTeacherFormInput,
	leftTeacherFormSchema,
} from "./left-schema";

type TeacherLeftFormProps = {
	id: TeacherBaseSchema["id"];
	onClose: () => void;
};

const DEFAULT_VALUES: LeftTeacherFormInput = {
	leftAt: formatInputDate(new Date()),
};

function TeacherLeftForm({ id, onClose }: TeacherLeftFormProps) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: DEFAULT_VALUES,
		resolver: zodResolver(leftTeacherFormSchema),
	});

	const { mutateAsync } = useMutation(teacherMutations.left);

	async function onSubmit(data: LeftTeacherFormData) {
		try {
			await mutateAsync({ params: { id }, body: data });
			toast.success("The teacher is marked as left");
			onClose();
		} catch (error) {
			if (error instanceof Error) {
				applyBackendErrors(error, setError);
			}
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<FieldGroup>
				<FieldLabel htmlFor="leftAt">Leave Date</FieldLabel>
				<Input type="date" id="leftAt" {...register("leftAt")} />
				<FieldError>{errors.leftAt?.message}</FieldError>
			</FieldGroup>
			<FieldError>{errors.root?.message}</FieldError>

			<ButtonGroup className="justify-end">
				<Button type="submit" disabled={isSubmitting}>
					Submit
				</Button>

				<Button
					type="button"
					onClick={() => onClose()}
					color="success"
					disabled={isSubmitting}
				>
					Cancel
				</Button>
			</ButtonGroup>
		</form>
	);
}

export { TeacherLeftForm };
