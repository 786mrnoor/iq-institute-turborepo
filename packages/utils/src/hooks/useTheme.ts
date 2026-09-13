import { useEffect, useState } from "react";
import { applyTheme, getSystemTheme, THEME_KEY, type Theme } from "../theme";

function getInitialTheme(): Theme {
	const storedTheme = localStorage.getItem(THEME_KEY);

	if (
		storedTheme === "light" ||
		storedTheme === "dark" ||
		storedTheme === "system"
	) {
		return storedTheme;
	}

	return "system";
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		applyTheme(theme);

		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	// Listen for OS theme changes when using "system".
	useEffect(() => {
		if (theme !== "system") {
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			applyTheme("system");
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

	return {
		theme,
		setTheme,
		resolvedTheme,
	};
}
