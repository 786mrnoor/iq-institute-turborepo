import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import { userBaseSchema } from "@repo/schemas/users/base.user";
import z from "zod";
import { dateRangeSchema } from "@/forms/shared/range-filter-form/range-filter.schema";
import { getDefaultRange } from "@/forms/shared/range-filter-form/range-filter-data";

export const userFilterFormSchema = z
	.object({
		role: emptyStringToUndefined(userBaseSchema.shape.role.optional()),
		status: emptyStringToUndefined(
			z.enum(userBaseSchema.shape.status.unwrap().enum).optional(),
		),
		dateRange: dateRangeSchema,
	})
	.transform((data) => {
		const { dateRange, ...rest } = data;
		return {
			...rest,
			...dateRange,
		};
	});

export type UserFilterFormData = z.infer<typeof userFilterFormSchema>;
export type UserFilterFormInput = z.input<typeof userFilterFormSchema>;

export function getDefaultValues() {
	return {
		...getDefaultRange(),
		role: "",
		status: "",
	} as const;
}

export const DEFAULT_VALUES = getDefaultValues();
