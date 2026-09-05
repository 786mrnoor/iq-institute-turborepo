import z from "zod";

export const indianMobileSchema = z
	.string("Mobile is required.")
	.trim()
	.regex(
		/^(?:\+91|91|0)?[-\s]?[6-9]\d{9}$/,
		"Please enter a valid 10-digit mobile number (e.g., +91 9876543210 or 9876543210)",
	);
