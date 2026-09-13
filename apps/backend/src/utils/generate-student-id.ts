import crypto from "node:crypto";

function generateStudentId(): string {
	const buffer = crypto.randomBytes(3);
	const random = buffer.toString("hex").toUpperCase();

	return `STU-${new Date().getFullYear()}-${random}`;
}

export { generateStudentId };
