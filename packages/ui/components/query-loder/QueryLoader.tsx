import { LoaderCircle } from "lucide-react";

type QueryLoaderProps = {
	children?: React.ReactNode;
};

function QueryLoader({ children }: QueryLoaderProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
			<LoaderCircle className="animate-spin" /> {children || "Loading..."}
		</div>
	);
}

export { QueryLoader };
