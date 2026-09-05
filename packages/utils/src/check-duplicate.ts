function checkDuplicate<T>(data: T[], onMatch: (index: number) => void) {
	const seenIds = new Set<T>();

	data.forEach((item, index) => {
		if (seenIds.has(item)) {
			onMatch(index);
		} else {
			seenIds.add(item);
		}
	});
}

export { checkDuplicate };
