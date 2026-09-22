import z from "zod";

import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import { studentBaseSchema } from "@repo/schemas/students/base.student";

import { dateRangeSchema } from "@/forms/shared/range-filter-form/range-filter.schema";
import { getDefaultRange } from "@/forms/shared/range-filter-form/range-filter-data";

export const studentFilterFormSchema = z
	.object({
		dateRange: dateRangeSchema,
		adharNo: emptyStringToUndefined(studentBaseSchema.shape.adharNo),
		apaarId: emptyStringToUndefined(studentBaseSchema.shape.apaarId),
	})
	.transform((data) => {
		const { dateRange, ...rest } = data;
		return {
			...rest,
			...dateRange,
		};
	});

export type StudentFilterFormData = z.infer<typeof studentFilterFormSchema>;
export type StudentFilterFormInput = z.input<typeof studentFilterFormSchema>;

export function getDefaultValues() {
	return {
		...getDefaultRange(),
	} as const;
}

export const DEFAULT_VALUES = getDefaultValues();
