export type ControllerResult<TData> = {
	success: true;
	message: string;
	statusCode: number;
	data: TData;
};
