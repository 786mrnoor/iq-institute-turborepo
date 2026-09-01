import z from "zod";

export const timestampSchema = {
	createdAt: z.coerce.date("Invalid createdAt date"),
	updatedAt: z.coerce.date("Invalid updatedAt date"),
};
