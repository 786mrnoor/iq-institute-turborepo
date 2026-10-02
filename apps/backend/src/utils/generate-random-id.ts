import crypto from "node:crypto";

function generateRandomId(): string {
	const buffer = crypto.randomBytes(3);
	const random = buffer.toString("hex").toUpperCase();

	return random;
}

export { generateRandomId };
