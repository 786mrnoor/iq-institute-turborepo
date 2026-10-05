import mongoose, { type InferSchemaType } from "mongoose";

import type { DefaultSchema } from "./types";

const teacherSchema = new mongoose.Schema(
	{
		teacherId: {
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

		adharNo: {
			type: String,
			required: true,
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

		joinedAt: {
			type: Date,
			required: true,
		},
		leftAt: {
			type: Date,
			default: null,
		},

		deletedAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

export type TTeacher = DefaultSchema & InferSchemaType<typeof teacherSchema>;

teacherSchema.index({ leftAt: -1 });
teacherSchema.index({ deletedAt: 1 });
teacherSchema.index({ teacherId: 1 }, { unique: true });
teacherSchema.index(
	{ adharNo: 1 },
	{
		unique: true,
		partialFilterExpression: {
			deletedAt: null,
		},
	},
);

export const Teacher = mongoose.model<TTeacher>("Teacher", teacherSchema);
