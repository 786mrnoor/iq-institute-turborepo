import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { teacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { Button } from "@repo/ui/button";
import { FieldError, FieldGroup } from "@repo/ui/field";
import { Input } from "@repo/ui/form-controls";

type SearchTeacherByAdharProps = {
	onSubmit: (data: string) => void;
};

const schema = z.object({
	adharNo: teacherBaseSchema.shape.adharNo,
});

function SearchTeacherByAdhar({ onSubmit }: SearchTeacherByAdharProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: { adharNo: "" },
		resolver: zodResolver(schema),
	});

	return (
		<form
			onSubmit={handleSubmit((data) => {
				onSubmit(data.adharNo);
				reset({ ...data });
			})}
			className="p-4 rounded-2xl bg-white dark:bg-neutral-800"
		>
			<FieldGroup>
				<FieldGroup orientation="horizontal">
					<Input
						placeholder={"Enter Adhar No"}
						className="w-fit"
						isInvalid={!!errors.adharNo?.message}
						{...register("adharNo")}
					/>
					<Button disabled={!isDirty} type="submit">
						Search
					</Button>
				</FieldGroup>
				<FieldError>{errors.adharNo?.message}</FieldError>
			</FieldGroup>
		</form>
	);
}

export { SearchTeacherByAdhar };
