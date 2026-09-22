"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import navBg from "@/assets/images/nav-bg.jpg";
import { AppLink } from "../link/AppLink";
import Bars from "./components/Bars";
import { NavLink } from "./components/NavLink";

function WebAppHeader() {
	const [showNav, setShowNav] = useState(false);

	return (
		<header className="relative flex flex-col flex-wrap items-center justify-between gap-y-9 border-b border-gray-300 px-4 py-5 shadow-[0_2px_6px_#00000033]">
			<div className="absolute overflow-hidden inset-0 -z-1">
				<Image
					src={navBg}
					alt="nav-bg"
					placeholder="blur"
					className="w-full h-full object-cover object-center"
				/>
			</div>

			<h2 className="text-center text-[5vw] font-bold text-white text-shadow-[3px_3px_0,-1px_-1px_0,1px_-1px_0,-1px_1px_0,1px_1px_0] text-shadow-black">
				<AppLink className="outline-none" href="/">
					I.Q. Educational Computer Institute
				</AppLink>
			</h2>

			<Bars
				active={showNav}
				onClick={() => setShowNav(!showNav)}
				className="ml-auto"
			/>

			<nav
				className={clsx(
					"absolute top-full left-0 md:static flex self-end md:flex-row md:gap-2.5",
					showNav ? "w-full flex-col md:w-auto" : "hidden md:flex",
				)}
			>
				<NavLink href="/courses">Courses</NavLink>
				<NavLink href="/contact-us">Contact Us</NavLink>
				<NavLink href="/login">Login</NavLink>
			</nav>
		</header>
	);
}

export { WebAppHeader };
