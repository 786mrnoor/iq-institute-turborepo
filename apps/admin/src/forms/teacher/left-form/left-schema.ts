import z from "zod";

export const leftTeacherFormSchema = z.object({
	leftAt: z.iso
		.date()
		.transform((date) => new Date(date))
		.refine(
			(date) => {
				const today = new Date();
				today.setHours(23, 59, 59, 999);

				return date <= today;
			},
			{
				error: "Leave date must be today or earlier.",
			},
		),
});

export type LeftTeacherFormData = z.infer<typeof leftTeacherFormSchema>;
export type LeftTeacherFormInput = z.input<typeof leftTeacherFormSchema>;
