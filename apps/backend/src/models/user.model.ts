import mongoose, { type InferSchemaType, type Model, Types } from "mongoose";

import { ROLES } from "@repo/schemas/user-roles";
import { USER_STATUS } from "@repo/schemas/users/base.user";

import type { DefaultSchema } from "./types";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			uppercase: true,
			trim: true,
			minlength: 3,
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		passwordHash: { type: String, required: true, select: false },
		role: {
			type: String,
			enum: Object.values(ROLES),
			required: true,
		},
		studentId: {
			type: Types.ObjectId,
			ref: "Student",
		},
		status: {
			type: String,
			enum: USER_STATUS,
			default: "active",
		},
		lastLoginAt: Date,
		passwordChangedAt: Date,
		passwordChangedBy: {
			type: Types.ObjectId,
			ref: "User",
		},
		createdBy: {
			type: Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

export type TUser = DefaultSchema & InferSchemaType<typeof userSchema>;

userSchema.index({ email: 1 }, { unique: true });

export const User: Model<TUser> =
	mongoose.models.User || mongoose.model<TUser>("User", userSchema);
