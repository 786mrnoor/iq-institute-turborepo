import z from "zod";

export const errorSchema = z.object({
	statusCode: z.number().min(300).max(599),
	message: z.string(),
	errors: z
		.array(
			z.object({
				path: z.string(),
				message: z.string(),
			}),
		)
		.optional(),
});
