export type Color = "primary" | "danger" | "success";
export type Size = "small" | "base";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
	className?: string;
	color?: Color;
	size?: Size;
};
