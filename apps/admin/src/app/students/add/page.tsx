import { Heading } from "@repo/ui/heading";
import { CreateStudentForm } from "@/forms/student/CreateStudentForm";

function AddStudentPage() {
	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5">
			<Heading className="mb-3">Add a new student</Heading>

			<CreateStudentForm />
		</main>
	);
}

export { AddStudentPage };
