import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { AppError } from "./app-error";

function applyBackendErrors<T extends FieldValues>(
	error: Error | AppError,
	setError: UseFormSetError<T>,
) {
	setError("root", { type: "server", message: error?.message });

	if (error instanceof AppError) {
		error.errors?.forEach(({ path, message }) => {
			setError(path as Path<T>, { type: "server", message });
		});
	}
}

export { applyBackendErrors };
