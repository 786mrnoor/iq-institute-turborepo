import mongoose, { type InferSchemaType, Schema } from "mongoose";

import { ENROLLMENT_STATUS } from "@repo/schemas/enrollments/base.enrollment";

import type { DefaultSchema } from "./types";

const feeSchema = new Schema(
	{
		amount: {
			type: Number,
			required: true,
			min: 0,
		},

		discount: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},

		finalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{ _id: false },
);

const enrollmentSchema = new Schema(
	{
		enrollmentId: {
			type: String,
			required: true,
		},
		studentId: {
			type: Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		courseId: {
			type: Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},

		enrolledAt: {
			type: Date,
			default: Date.now,
			required: true,
		},

		fee: {
			type: feeSchema,
			required: true,
		},

		status: {
			type: String,
			enum: ENROLLMENT_STATUS,
			required: true,
			default: "active",
		},
		leftAt: Date,
		deletedAt: Date,
	},
	{
		timestamps: true,
	},
);

enrollmentSchema.index({ deletedAt: 1 });
enrollmentSchema.index({ enrollmentId: 1 }, { unique: true });
enrollmentSchema.index(
	{
		status: 1,
	},
	{
		partialFilterExpression: {
			deletedAt: null,
		},
	},
);
enrollmentSchema.index(
	{ studentId: 1, courseId: 1 },
	{
		unique: true,
		partialFilterExpression: {
			status: { $in: ["active", "completed"] },
			deletedAt: null,
		},
	},
);

export type TEnrollment = DefaultSchema &
	InferSchemaType<typeof enrollmentSchema>;

export const Enrollment = mongoose.model<TEnrollment>(
	"Enrollment",
	enrollmentSchema,
);
