import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/header/Header";
import { SideNav } from "./components/side-nav/SideNav";

function Layout() {
	const [showNav, setShowNav] = useState(false);

	return (
		<>
			<SideNav showNav={showNav} setShowNav={setShowNav} />

			<main className="md:ml-50 lg:ml-60">
				<Header onOpen={() => setShowNav(true)} />

				<Outlet />
			</main>
		</>
	);
}

export { Layout };
