import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

export async function connectDatabase() {
	mongoServer = await MongoMemoryServer.create();

	await mongoose.connect(mongoServer.getUri());
	await mongoose.connection.syncIndexes();
}

export async function clearDatabase() {
	const collections = mongoose.connection.collections;

	for (const collection of Object.values(collections)) {
		await collection.deleteMany({});
	}
}

export async function disconnectDatabase() {
	await mongoose.disconnect();

	await mongoServer.stop();
}
