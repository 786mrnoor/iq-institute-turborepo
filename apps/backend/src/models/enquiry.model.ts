import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";
import type { DefaultSchema } from "./types";

const enquirySchema = new Schema(
	{
		course: { type: String, required: true },
		name: { type: String, required: true },
		mobile: { type: String, required: true },
		address: { type: String, required: true },
		status: {
			type: String,
			enum: ["pending", "reviewed", "contacted"],
			default: "pending",
		},
	},
	{ timestamps: true },
);

export type TEnquiry = DefaultSchema & InferSchemaType<typeof enquirySchema>;

enquirySchema.index({ createdAt: -1 });

export const Enquiry: Model<TEnquiry> =
	mongoose.models.Enquiry || mongoose.model<TEnquiry>("Enquiry", enquirySchema);
