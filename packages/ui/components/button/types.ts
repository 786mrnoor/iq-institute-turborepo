export type Color = "primary" | "danger" | "success" | "transparent";
export type Size = "small" | "base";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
	className?: string;
	color?: Color;
	size?: Size;
};
