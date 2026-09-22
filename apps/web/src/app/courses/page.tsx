import { Heading } from "@repo/ui/heading";

import { Courses } from "./components/Courses";

export default function CoursesPage() {
	return (
		<main className="p-5">
			<Heading className="mb-8">Our Courses</Heading>
			<Courses />
		</main>
	);
}
