import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input } from "@repo/ui/form-controls";
import { useForm } from "react-hook-form";
import { RangeFilterForm } from "@/forms/shared/range-filter-form/RangeFilterForm";
import {
	DEFAULT_VALUES,
	type StudentFilterFormData,
	type StudentFilterFormInput,
	studentFilterFormSchema,
} from "./schema";

type StudentFilterFormProps = {
	onSubmit: (data: StudentFilterFormData) => void;
};

function StudentFilterForm({ onSubmit }: StudentFilterFormProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<StudentFilterFormInput, unknown, StudentFilterFormData>({
		defaultValues: DEFAULT_VALUES,
		resolver: zodResolver(studentFilterFormSchema),
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mt-5 flex flex-wrap items-start gap-5 *:w-fit p-5 bg-white border border-gray-300 rounded-md"
		>
			<FieldGroup size="small">
				<FieldLabel htmlFor="adharNo">Adhar No.</FieldLabel>
				<Input
					id="adharNo"
					isInvalid={!!errors?.adharNo?.message}
					placeholder="Enter Student Adhar No."
					{...register("adharNo")}
				/>
				<FieldError>{errors?.adharNo?.message}</FieldError>
			</FieldGroup>

			<FieldGroup size="small">
				<FieldLabel htmlFor="apaarId">APAAR ID</FieldLabel>
				<Input
					id="apaarId"
					isInvalid={!!errors?.apaarId?.message}
					placeholder="Enter Student APAAR ID"
					{...register("apaarId")}
				/>
				<FieldError>{errors?.apaarId?.message}</FieldError>
			</FieldGroup>

			<RangeFilterForm register={register} errors={errors} control={control} />

			<Button size="small" type="submit" className="mt-6">
				Apply
			</Button>
		</form>
	);
}

export { StudentFilterForm };
