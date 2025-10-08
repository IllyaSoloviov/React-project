import {useTheme} from "@/providers/ThemeContextProvider.tsx";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative inline-flex h-6 w-11 items-center rounded-full
                transition-colors duration-300 ease-in-out
                ${theme === "dark" ? "bg-bg-span" : "bg-text-secondary"}
            `}
        >
            <span
                className={`
                    inline-block h-4 w-4 transform rounded-full bg-white
                    transition-transform duration-300 ease-in-out
                    ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
                `}
            />
        </button>
    );
}