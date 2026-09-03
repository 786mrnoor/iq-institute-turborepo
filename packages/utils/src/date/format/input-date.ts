const inputDateFormatter = new Intl.DateTimeFormat("en-IN", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

export function formatInputDate(date: Date): string {
	return inputDateFormatter.format(date).split("/").reverse().join("-");
}
