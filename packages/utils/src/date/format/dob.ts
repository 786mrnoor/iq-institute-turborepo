export function formatDOB(date: Date) {
	return date.toISOString().slice(0, 10).split("-").reverse().join("-");
}
