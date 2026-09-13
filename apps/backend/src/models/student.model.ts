import mongoose, { type InferSchemaType, type Model } from "mongoose";

import type { DefaultSchema } from "./types";

const studentSchema = new mongoose.Schema(
	{
		studentId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 100,
			uppercase: true,
		},

		dob: {
			type: Date,
			required: true,
		},

		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},

		fatherName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 100,
			uppercase: true,
		},

		motherName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 100,
			uppercase: true,
		},

		adharNo: {
			type: String,
			trim: true,
			match: /^\d{12}$/,
		},

		apaarId: {
			type: String,
			trim: true,
			match: /^\d{12}$/,
		},

		mobile: {
			type: String,
			required: true,
			trim: true,
			match: /^(?:\+91|91|0)?[-\s]?[6-9]\d{9}$/,
		},

		email: {
			type: String,
			trim: true,
			lowercase: true,
		},

		address: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 500,
		},
		deletedAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

export type TStudent = DefaultSchema & InferSchemaType<typeof studentSchema>;

studentSchema.index({ createdAt: -1 });
studentSchema.index({ deletedAt: 1 });
studentSchema.index({ studentId: 1 }, { unique: true });
studentSchema.index(
	{ adharNo: 1 },
	{
		unique: true,
		partialFilterExpression: {
			apaarId: { $exists: true },
			deletedAt: null,
		},
	},
);
studentSchema.index(
	{ apaarId: 1 },
	{
		unique: true,
		partialFilterExpression: {
			apaarId: { $exists: true },
			deletedAt: null,
		},
	},
);

export const Student: Model<TStudent> =
	mongoose.models.Student || mongoose.model<TStudent>("Student", studentSchema);
