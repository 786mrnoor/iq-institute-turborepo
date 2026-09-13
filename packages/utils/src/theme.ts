export type Theme = "system" | "dark" | "light";

export const THEME_KEY = "theme";

export function getSystemTheme(): "light" | "dark" {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function applyTheme(theme: Theme) {
	const root = document.documentElement;

	const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

	root.classList.toggle("dark", resolvedTheme === "dark");
}
