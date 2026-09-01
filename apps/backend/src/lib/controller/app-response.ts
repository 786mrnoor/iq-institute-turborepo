import type { ControllerResult } from "./types";

function response<TData>(
	statusCode: number,
	message: string,
	data: TData,
): ControllerResult<TData> {
	return {
		success: true,
		statusCode,
		message,
		data,
	};
}

export { response };
