import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ROLES } from "@repo/schemas/user-roles";
import { USER_STATUS } from "@repo/schemas/users/base.user";
import { Button } from "@repo/ui/button";
import { FieldGroup, FieldLabel } from "@repo/ui/field";
import { Select } from "@repo/ui/form-controls";

import { RangeFilterForm } from "@/forms/shared/range-filter-form/RangeFilterForm";
import {
	DEFAULT_VALUES,
	type UserFilterFormData,
	type UserFilterFormInput,
	userFilterFormSchema,
} from "./schema";

type UserFilterFormProps = {
	onSubmit: (data: UserFilterFormData) => void;
};

function UserFilterForm({ onSubmit }: UserFilterFormProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<UserFilterFormInput, unknown, UserFilterFormData>({
		defaultValues: DEFAULT_VALUES,
		resolver: zodResolver(userFilterFormSchema),
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mt-5 flex flex-wrap items-start gap-x-5 gap-y-2 *:w-fit p-5 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:border-neutral-700"
		>
			<FieldGroup size="small">
				<FieldLabel htmlFor="role">Select Role</FieldLabel>
				<Select className="capitalize" {...register("role")}>
					<option value="">All</option>
					{Object.values(ROLES).map((s) => (
						<option key={s} value={s} className="capitalize">
							{s}
						</option>
					))}
				</Select>
			</FieldGroup>

			<FieldGroup size="small">
				<FieldLabel htmlFor="role">Select Status</FieldLabel>
				<Select className="capitalize" {...register("status")}>
					<option value="">All</option>
					{USER_STATUS.map((s) => (
						<option key={s} value={s} className="capitalize">
							{s}
						</option>
					))}
				</Select>
			</FieldGroup>

			<RangeFilterForm register={register} errors={errors} control={control} />

			<Button size="small" type="submit" className="mt-6">
				Apply
			</Button>
		</form>
	);
}

export { UserFilterForm };
