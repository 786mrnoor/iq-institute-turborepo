import { Header } from "@repo/ui/header";
import Image from "next/image";
import navBg from "@/assets/images/nav-bg.jpg";
import { AppLink } from "../link/AppLink";
import { NavLink } from "./components/NavLink";

function WebAppHeader() {
	const homeLink = (
		<AppLink className="outline-none" href="/">
			I.Q. Educational Computer Institute
		</AppLink>
	);

	const image = (
		<Image
			src={navBg}
			alt="nav-bg"
			placeholder="blur"
			className="w-full h-full object-cover object-center"
		/>
	);

	return (
		<Header homeLink={homeLink} image={image}>
			<NavLink href="/">Courses</NavLink>
			<NavLink href="/">Contact Us</NavLink>
			<NavLink href="/">Login</NavLink>
		</Header>
	);
}

export { WebAppHeader };
