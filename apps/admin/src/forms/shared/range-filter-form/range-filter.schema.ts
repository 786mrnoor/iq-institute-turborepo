import z from "zod";

import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import { toLocalDate } from "@repo/utils/date/to/index.ts";

import { dateRangeValues } from "./range-filter-data";
import { rangeToDate } from "./utility/range-to-date";

export const dateRangeSchema = z
	.object({
		range: z.enum(dateRangeValues),
		fromDate: emptyStringToUndefined(
			z.iso.date("Enter a valid date").optional(),
		),
		toDate: emptyStringToUndefined(z.iso.date("Enter a valid date").optional()),
	})
	.superRefine((data, ctx) => {
		if (data.range !== "custom") return;

		if (!data.fromDate) {
			ctx.addIssue({
				code: "custom",
				path: ["fromDate"],
				message: "From date is required",
			});
		}

		if (!data.toDate) {
			ctx.addIssue({
				code: "custom",
				path: ["toDate"],
				message: "To date is required",
			});
		}

		if (data.fromDate && data.toDate && data.fromDate > data.toDate) {
			ctx.addIssue({
				code: "custom",
				path: ["toDate"],
				message: "To date must be after from date",
			});
		}
	})
	.transform((data) => {
		if (data.range !== "custom") return rangeToDate(data.range);
		return {
			fromDate: data.fromDate ? toLocalDate(data.fromDate) : new Date(),
			toDate: data.toDate ? toLocalDate(data.toDate) : new Date(),
		};
	});

export type DateRangeData = z.infer<typeof dateRangeSchema>;
export type DateRangeInput = { dateRange: z.input<typeof dateRangeSchema> };
