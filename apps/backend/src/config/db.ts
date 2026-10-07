import mongoose from "mongoose";

export async function connectDB() {
	const dbUri = process.env.BACKEND_MONGODB_URI;
	if (!dbUri) throw new Error("database uri does not found");

	await mongoose.connect(dbUri);

	// mongoose.set("autoIndex", false);
}
