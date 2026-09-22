import { Heading } from "@repo/ui/heading";

import { LoginForm } from "./components/LoginForm";

function LoginPage() {
	return (
		<main className="mx-auto my-25 w-9/10 max-w-100 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5">
			<Heading className="mb-3">Login</Heading>

			<LoginForm />
		</main>
	);
}

export default LoginPage;
