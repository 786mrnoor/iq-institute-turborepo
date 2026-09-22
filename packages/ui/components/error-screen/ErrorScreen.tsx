import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Anchor } from "lucide-react";
import type React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../button";

type ErrorScreenProps = {
	children: React.ReactNode;
	title?: string;
};

function ErrorScreen({
	children,
	title = "There was an error!",
}: ErrorScreenProps) {
	const { reset } = useQueryErrorResetBoundary();

	function getErrorMessage(error: unknown) {
		let message = "Something went wrong";
		if (error instanceof Error) message = error.message;

		return message;
	}

	return (
		<ErrorBoundary
			onReset={reset}
			fallbackRender={({ resetErrorBoundary, error }) => (
				<div className="broder-2 m-auto w-full max-w-md rounded-2xl border-gray-400 bg-white p-8 text-center shadow-2xl shadow-gray-400 dark:bg-neutral-800 dark:shadow-none">
					{/* Visual Anchor / Icon */}
					<div className="bg-red-100 text-red-500 mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
						<Anchor className="size-8 text-red" />
					</div>

					<h1 className="mb-3 text-2xl font-bold tracking-tight text-red">
						{title}
					</h1>
					<p className="mb-8 text-sm leading-relaxed text-gray-500 dark:text-neutral-300">
						{getErrorMessage(error)}
					</p>

					<Button
						className="btn btn-danger"
						onClick={() => resetErrorBoundary()}
					>
						Try Again
					</Button>
				</div>
			)}
		>
			{children}
		</ErrorBoundary>
	);
}

export { ErrorScreen };
