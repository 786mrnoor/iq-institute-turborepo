import { NotFound } from "@repo/ui/not-found";
import Link from "next/link";

function NotFoundPage() {
	return (
		<NotFound>
			<Link
				href="/"
				className="mt-5 border-2 border-primary text-primary font-semibold py-3 px-6 rounded-3xl uppercase inline-block transition-all hover:bg-primary hover:text-white "
			>
				Go back home
			</Link>
		</NotFound>
	);
}

export default NotFoundPage;
