import { useNavigation } from "react-router";

function LoadingLine() {
	const navigation = useNavigation();

	const isNavigating = navigation.state === "loading";
	if (!isNavigating) return null;

	return (
		<div className="fixed left-0 right-0 z-50 h-1 w-full overflow-hidden bg-gray-100 dark:bg-neutral-900">
			<div className="h-full bg-blue-600 rounded-r w-99/100 starting:w-0 duration-5000 ease-[cubic-bezier(0.1, 0.85, 0.5, 1)]" />
		</div>
	);
}

export { LoadingLine };
