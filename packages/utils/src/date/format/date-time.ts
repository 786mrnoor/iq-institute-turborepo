const dateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	hour12: true,
});

export function formatDateTime(date: Date): string {
	return dateTimeFormatter.format(date).replaceAll("/", "-");
}
