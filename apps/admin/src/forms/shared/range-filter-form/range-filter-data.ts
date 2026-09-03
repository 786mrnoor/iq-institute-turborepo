import { formatInputDate } from "@repo/utils/date/format/index.ts";

export const dateRangeValues = [
	"lastWeek",
	"lastMonth",
	"3months",
	"6months",
	"lastYear",
	"custom",
] as const;

export const dateRangeOptions = [
	{ label: "Last Week", value: "lastWeek" },
	{ label: "Last Month", value: "lastMonth" },
	{ label: "3 months", value: "3months" },
	{ label: "6 months", value: "6months" },
	{ label: "Last Year", value: "lastYear" },
	{ label: "custom", value: "custom" },
] as const;

export function getDefaultRange() {
	const today = formatInputDate(new Date());

	return {
		dateRange: {
			range: "lastWeek",
			fromDate: today,
			toDate: today,
		},
	} as const;
}
