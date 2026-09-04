import mongoose, { type InferSchemaType, type Model } from "mongoose";
import type { DefaultSchema } from "./types";

const topicSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true, minlenght: 3 },
		deletedAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

topicSchema.index({ deletedAt: 1 });
topicSchema.index(
	{ title: 1 },
	{
		unique: true,
		partialFilterExpression: {
			deletedAt: null,
		},
	},
);

export type TTopic = DefaultSchema & InferSchemaType<typeof topicSchema>;

export const Topic: Model<TTopic> =
	mongoose.models.Topic || mongoose.model<TTopic>("Topic", topicSchema);
