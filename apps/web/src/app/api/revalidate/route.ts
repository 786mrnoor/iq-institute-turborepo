import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { revalidateSchema } from "@repo/schemas/revalidate/revalidate";

async function POST(request: NextRequest) {
	const secret = request.headers.get("x-revalidate-secret");

	// Verify secret token to prevent unauthorized cache purging
	const nextSecret = process.env.NEXT_REVALIDATION_SECRET;
	if (!secret || !nextSecret || secret !== nextSecret) {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const parsed = revalidateSchema.safeParse(body);

		if (!parsed.success)
			return NextResponse.json(
				{ message: "pass the correct path" },
				{ status: 400 },
			);

		parsed.data.forEach((path) => {
			revalidatePath(path);
		});
		revalidatePath("/courses");
		revalidatePath("/contact-us");

		return NextResponse.json(null);
	} catch {
		return NextResponse.json(
			{ message: "Error revalidating" },
			{ status: 500 },
		);
	}
}

export { POST };
