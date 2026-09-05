import { enquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";
import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import z from "zod";
import { dateRangeSchema } from "@/forms/shared/range-filter-form/range-filter.schema";
import { getDefaultRange } from "@/forms/shared/range-filter-form/range-filter-data";

export const enquiryFilterFormSchema = z
	.object({
		dateRange: dateRangeSchema,
		status: emptyStringToUndefined(
			z.enum(enquiryBaseSchema.shape.status.unwrap().enum).optional(),
		),
	})
	.transform((data) => {
		const { dateRange, ...rest } = data;
		return {
			...rest,
			...dateRange,
		};
	});

export type EnquiryFilterFormData = z.infer<typeof enquiryFilterFormSchema>;
export type EnquiryFilterFormInput = z.input<typeof enquiryFilterFormSchema>;

export function getDefaultValues() {
	return {
		status: "",
		...getDefaultRange(),
	} as const;
}

export const DEFAULT_VALUES = getDefaultValues();
