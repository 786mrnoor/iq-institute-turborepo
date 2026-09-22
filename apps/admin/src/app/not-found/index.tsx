import { NotFound } from "@repo/ui/not-found";
import { Link } from "react-router";

function NotFoundPage() {
	return (
		<NotFound>
			<Link
				to="/admin"
				className="mt-5 border-2 border-primary text-primary font-semibold py-3 px-6 rounded-3xl uppercase inline-block transition-all hover:bg-primary hover:text-white"
			>
				Go Back Home
			</Link>
		</NotFound>
	);
}

export { NotFoundPage };
