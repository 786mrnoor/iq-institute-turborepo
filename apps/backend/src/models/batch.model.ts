import mongoose, { type InferSchemaType, Schema } from "mongoose";

import { BATCH_STATUS } from "@repo/schemas/batch/base.batch";

import type { DefaultSchema } from "./types";

const scheduleSchema = new mongoose.Schema(
	{
		startTime: {
			type: String,
			required: true,
		},

		endTime: {
			type: String,
			required: true,
		},
	},
	{ _id: false },
);

const batchSchema = new mongoose.Schema(
	{
		courseId: {
			type: Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},
		teacherId: {
			type: Schema.Types.ObjectId,
			ref: "Teacher",
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 100,
		},
		code: {
			type: String,
			required: true,
			trim: true,
			uppercase: true,
			maxlength: 30,
		},
		startDate: {
			type: Date,
			required: true,
		},

		endDate: {
			type: Date,
			required: true,
		},
		capacity: {
			type: Number,
			required: true,
			min: 1,
		},
		schedule: {
			type: scheduleSchema,
			required: true,
		},
		status: {
			type: String,
			enum: BATCH_STATUS,
			default: "active",
		},
		deletedAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

batchSchema.index({ deletedAt: 1 });
batchSchema.index({ teacherId: 1 });
batchSchema.index(
	{ courseId: 1, code: 1 },
	{
		unique: true,
		partialFilterExpression: {
			deletedAt: null,
		},
	},
);
batchSchema.index(
	{ status: 1, startDate: -1 },
	{
		partialFilterExpression: {
			deletedAt: null,
		},
	},
);

export type TBatch = DefaultSchema & InferSchemaType<typeof batchSchema>;

export const Batch = mongoose.model<TBatch>("Batch", batchSchema);
