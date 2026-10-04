import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { teacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { Button } from "@repo/ui/button";
import { FieldError, FieldGroup } from "@repo/ui/field";
import { Input } from "@repo/ui/form-controls";

type SearchTeacherProps = {
	onSubmit: (data: string) => void;
};

const schema = z.object({
	teacherId: teacherBaseSchema.shape.teacherId,
});

function SearchTeacherById({ onSubmit }: SearchTeacherProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: { teacherId: "" },
		resolver: zodResolver(schema),
	});

	return (
		<form
			onSubmit={handleSubmit((data) => {
				onSubmit(data.teacherId);
				reset({ ...data });
			})}
			className="p-4 rounded-2xl bg-white dark:bg-neutral-800"
		>
			<FieldGroup>
				<FieldGroup orientation="horizontal">
					<Input
						placeholder={"Enter Teacher Id"}
						className="w-fit"
						isInvalid={!!errors.teacherId?.message}
						{...register("teacherId")}
					/>
					<Button disabled={!isDirty} type="submit">
						Search
					</Button>
				</FieldGroup>
				<FieldError>{errors.teacherId?.message}</FieldError>
			</FieldGroup>
		</form>
	);
}

export { SearchTeacherById };
