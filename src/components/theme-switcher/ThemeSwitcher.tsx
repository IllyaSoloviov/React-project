import {useTheme} from "@/providers/ThemeContextProvider.tsx";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative inline-flex h-7 w-12 items-center rounded-full
                transition-colors duration-300 ease-in-out bg-
                ${theme === "dark" ? "bg-contrast" : "bg-text-secondary"}
            `}
        >
            <span
                className={`
                    inline-block h-5 w-5 transform rounded-full bg-bg
                    transition-transform duration-300 ease-in-out
                    ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
                `}
            />
        </button>
    );
}