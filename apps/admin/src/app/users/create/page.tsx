import { Heading } from "@repo/ui/heading";

import { CreateUserForm } from "./components/CreateUserForm";

function CreateAccountPage() {
	return (
		<main className="mx-auto my-25 w-9/10 max-w-100 rounded-2xl border border-gray-300 bg-white p-2.5 sm:p-5 dark:bg-neutral-800 dark:border-neutral-700">
			<Heading className="mb-3">User Form</Heading>

			<CreateUserForm />
		</main>
	);
}

export default CreateAccountPage;
