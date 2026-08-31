import { FooterLink } from "./components/FooterLink";

export function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="space-y-4 bg-primary-dark p-10 text-white">
			<div className="flex w-auto flex-col flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:flex-row">
				<FooterLink href={"/"}>Home</FooterLink>
				<FooterLink href="/">Couses</FooterLink>
				<FooterLink href="/">Contact Us</FooterLink>
				<FooterLink href="/">Login</FooterLink>
			</div>
			<p className="text-center text-sm">
				Copyright © {year} I.Q. EDUCATIONAL COMPUTER INSTITUTE & LIBRARY. All
				rights reserved.
			</p>
		</footer>
	);
}
