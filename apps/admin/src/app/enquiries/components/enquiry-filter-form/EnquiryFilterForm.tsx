import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Select } from "@repo/ui/form-controls";
import { useForm } from "react-hook-form";
import { RangeFilterForm } from "@/forms/shared/range-filter-form/RangeFilterForm";
import {
	DEFAULT_VALUES,
	type EnquiryFilterFormData,
	type EnquiryFilterFormInput,
	enquiryFilterFormSchema,
} from "./schema";

type EnquiryFilterFormProps = {
	onSubmit: (data: EnquiryFilterFormData) => void;
};

function EnquiryFilterForm({ onSubmit }: EnquiryFilterFormProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<EnquiryFilterFormInput, unknown, EnquiryFilterFormData>({
		defaultValues: DEFAULT_VALUES,
		resolver: zodResolver(enquiryFilterFormSchema),
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mt-5 flex flex-wrap items-start gap-5 *:w-fit bg-white p-5 border border-gray-200 rounded-md"
		>
			<FieldGroup size="small">
				<FieldLabel htmlFor="status">Status</FieldLabel>
				<Select
					id="status"
					{...register("status")}
					isInvalid={!!errors?.status?.message}
				>
					<option value="">All</option>
					<option value="pending">Pending</option>
					<option value="reviewed">Reviewed</option>
					<option value="contacted">Contacted</option>
				</Select>
				<FieldError>{errors?.status?.message}</FieldError>
			</FieldGroup>

			<RangeFilterForm control={control} errors={errors} register={register} />

			<Button size="small" type="submit" className="mt-6">
				Apply
			</Button>
		</form>
	);
}

export { EnquiryFilterForm };
