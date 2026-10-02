function checkYearsAgo(yearsAgo: number, date: Date): boolean {
	const today = new Date();

	const ago = new Date(
		Date.UTC(
			today.getUTCFullYear() - Math.floor(yearsAgo),
			today.getUTCMonth(),
			today.getUTCDate(),
		),
	);

	return date <= ago;
}

export { checkYearsAgo };
