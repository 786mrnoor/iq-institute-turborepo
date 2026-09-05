import type { ControllerResult } from "./types";

type SuccessStatusCode = 200 | 201 | 204;

/**
 * ## Successful HTTP status codes.
 *
 * **200 - OK**: Successful GET, PUT, or PATCH operation.
 *
 * **201 - Created**: Successful POST request.
 *
 * **204 - No Content**: Successful DELETE request.
 *
 * **304 - Not Modified**: The response has not been modified.
 */

function response<TData>(
	statusCode: SuccessStatusCode,
	data: TData,
): ControllerResult<TData> {
	return {
		statusCode,
		data,
	};
}

export { response };
