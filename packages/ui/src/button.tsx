import type React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			className={`px-4 py-2 bg-primary text-white rounded ${className || ""}`}
			{...props}
		>
			{children}
		</button>
	);
}
