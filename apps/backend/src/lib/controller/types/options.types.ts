import type {
	InferRequestShape,
	RequestZodShape,
} from "@repo/schemas/request-types";
import type {
	AuthControllerContext,
	PublicControllerContext,
} from "./context.types";
import type { ControllerResult } from "./result.types";

type DefaultOptions<TSchema extends RequestZodShape> = {
	schema: TSchema;
};

type AuthOptions<
	TSchema extends RequestZodShape,
	TResult,
> = DefaultOptions<TSchema> & {
	requireAuth: true;
	handler: (
		ctx: AuthControllerContext<InferRequestShape<TSchema>>,
	) => Promise<ControllerResult<TResult>>;
};

type PublicOptions<
	TSchema extends RequestZodShape,
	TResult,
> = DefaultOptions<TSchema> & {
	requireAuth?: false;
	handler: (
		ctx: PublicControllerContext<InferRequestShape<TSchema>>,
	) => Promise<ControllerResult<TResult>>;
};

export type ControllerOptions<TSchema extends RequestZodShape, TResult> =
	| AuthOptions<TSchema, TResult>
	| PublicOptions<TSchema, TResult>;
