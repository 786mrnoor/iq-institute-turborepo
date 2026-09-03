import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input, Select } from "@repo/ui/form-controls";
import {
	type Control,
	type FieldErrors,
	type UseFormRegister,
	useWatch,
} from "react-hook-form";
import type { DateRangeData, DateRangeInput } from "./range-filter.schema";
import { dateRangeOptions } from "./range-filter-data";

type RangeFilterFormProps = {
	register: UseFormRegister<DateRangeInput>;
	errors: FieldErrors<DateRangeInput>;
	control: Control<DateRangeInput, unknown, DateRangeData>;
};

function RangeFilterForm({ register, errors, control }: RangeFilterFormProps) {
	const range = useWatch({
		control,
		name: "dateRange.range",
	});

	return (
		<>
			<FieldGroup size="small">
				<FieldLabel htmlFor="dateRange.range">Date Range</FieldLabel>
				<Select
					id="dateRange.range"
					{...register("dateRange.range")}
					isInvalid={!!errors?.dateRange?.range?.message}
				>
					{dateRangeOptions.map((option) => (
						<option value={option.value} key={option.value}>
							{option.label}
						</option>
					))}
				</Select>
				<FieldError>{errors?.dateRange?.range?.message}</FieldError>
			</FieldGroup>

			{range === "custom" && (
				<>
					<FieldGroup size="small">
						<FieldLabel htmlFor="dateRange.fromDate">From</FieldLabel>
						<Input
							id="dateRange.fromDate"
							type="date"
							isInvalid={!!errors?.dateRange?.fromDate?.message}
							{...register("dateRange.fromDate")}
						/>
						<FieldError>{errors?.dateRange?.fromDate?.message}</FieldError>
					</FieldGroup>

					<FieldGroup size="small">
						<FieldLabel htmlFor="dateRange.toDate">To</FieldLabel>
						<Input
							type="date"
							id="dateRange.toDate"
							isInvalid={!!errors?.dateRange?.toDate?.message}
							{...register("dateRange.toDate")}
						/>
						<FieldError>{errors?.dateRange?.toDate?.message}</FieldError>
					</FieldGroup>
				</>
			)}
		</>
	);
}

export { RangeFilterForm };
