import type { dateRangeValues } from "../range-filter-data";

function rangeToDate(range: (typeof dateRangeValues)[number]) {
	const toDate = new Date();
	const fromDate = new Date();

	toDate.setHours(0, 0, 0, 0);
	fromDate.setHours(0, 0, 0, 0);

	switch (range) {
		case "lastWeek": {
			fromDate.setDate(fromDate.getDate() - 7);
			break;
		}
		case "lastMonth": {
			fromDate.setMonth(fromDate.getMonth() - 1);
			break;
		}
		case "3months": {
			fromDate.setMonth(fromDate.getMonth() - 3);
			break;
		}
		case "6months": {
			fromDate.setMonth(fromDate.getMonth() - 6);
			break;
		}
		case "lastYear": {
			fromDate.setFullYear(fromDate.getFullYear() - 1);
			break;
		}
	}

	return {
		toDate,
		fromDate,
	};
}

export { rangeToDate };
