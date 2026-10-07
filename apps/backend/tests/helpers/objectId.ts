import mongoose from "mongoose";

export function createObjectId() {
	const id = new mongoose.Types.ObjectId();

	return id.toString();
}
