/**
 * Converts a date string (format YYYY-MM-DD) to a Date object
 * representing the same date in the local timezone.
 * @param dateString - a date string in the format YYYY-MM-DD
 * @returns a Date object representing the same date in the local timezone
 */
export function toLocalDate(dateString: string) {
	const [year, month, date] = dateString.split("-").map(Number);
	const localDate = new Date(year, month - 1, date);

	return localDate;
}
