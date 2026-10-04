import { Heading } from "@repo/ui/heading";

import { CreateTeacherForm } from "@/forms/teacher/CreateTeacherForm";

function AddTeacherPage() {
	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5 dark:bg-neutral-800 dark:border-neutral-700">
			<Heading className="mb-3">Teacher Form</Heading>

			<CreateTeacherForm />
		</main>
	);
}

export { AddTeacherPage };
