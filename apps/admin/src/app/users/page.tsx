import { Button } from "@repo/ui/button";
import { Heading } from "@repo/ui/heading";
import { useNavigate } from "react-router";

function UsersPage() {
	const navigate = useNavigate();
	return (
		<main className="mx-auto my-5 w-96/100 rounded-lg border border-gray-300 p-5 shadow-lg">
			<Heading>Users</Heading>
			<Button onClick={() => navigate("/admin/users/create")}>
				Create A New User
			</Button>
		</main>
	);
}

export default UsersPage;
