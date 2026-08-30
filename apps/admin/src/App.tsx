import { Button } from "@repo/ui/button";
import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<main className="p-4">
			<h1>Admin Heading</h1>

			<Button onClick={() => setCount(count + 1)}>Admin Button {count}</Button>
		</main>
	);
}

export default App;
