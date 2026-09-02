import type { ControllerResult } from "./types";

function response<TData>(
	statusCode: number,
	data: TData,
): ControllerResult<TData> {
	return {
		statusCode,
		data,
	};
}

export { response };
