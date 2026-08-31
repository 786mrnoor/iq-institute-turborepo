import { Gallery } from "./components/Gallery";
import { Heading } from "./components/Heading";

function HomePage() {
	return (
		<main className="px-5 py-8">
			<Heading>
				WELCOME TO I.Q. EDUCATIONAL COMPUTER INSTITUTE & LIBRARY
			</Heading>
			<Gallery />
		</main>
	);
}

export default HomePage;
