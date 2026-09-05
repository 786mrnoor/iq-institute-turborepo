import { DURATION_UNITS } from "@repo/schemas/course/base.course";
import type { Model } from "mongoose";
import mongoose, { type InferSchemaType } from "mongoose";
import type { DefaultSchema } from "./types";

const durationSchema = new mongoose.Schema(
	{
		value: {
			type: Number,
			required: true,
		},
		unit: {
			type: String,
			enum: DURATION_UNITS,
			required: true,
		},
	},
	{ _id: false },
);

const courseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true, minlength: 3 },
		duration: {
			type: durationSchema,
			required: true,
		},
		eligibility: { type: String, trim: true, required: true },
		description: { type: String, trim: true, required: true },
		topics: {
			type: [mongoose.Types.ObjectId],
			required: true,
			validate: {
				validator: (value: mongoose.Types.ObjectId[]) => value.length > 0,
				message: "Course must have at least one topic",
			},
		},
		deletedAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

courseSchema.index({ deletedAt: 1 });
courseSchema.index(
	{ title: 1 },
	{
		unique: true,
		partialFilterExpression: {
			deletedAt: null,
		},
	},
);

export type TCourse = DefaultSchema & InferSchemaType<typeof courseSchema>;

export const Course: Model<TCourse> =
	mongoose.models.Course || mongoose.model<TCourse>("Course", courseSchema);
