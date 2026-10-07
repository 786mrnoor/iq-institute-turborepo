import path from "node:path";

import dotenv from "dotenv";
import { afterAll, afterEach, beforeAll } from "vitest";

import {
	clearDatabase,
	connectDatabase,
	disconnectDatabase,
} from "./helpers/database";

// Explicitly point dotenv to your .env.test file
dotenv.config({
	path: path.resolve(process.cwd(), ".env.test"),
});

beforeAll(connectDatabase);
afterEach(clearDatabase);
afterAll(disconnectDatabase);
