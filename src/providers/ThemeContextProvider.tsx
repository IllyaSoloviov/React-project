import {
    createContext,
    useContext,
    useState,
    useEffect,
    type PropsWithChildren,
    type FC
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void; // Додаємо setTheme для явного встановлення теми, якщо потрібно
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);



export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Ініціалізуємо тему з localStorage або системних налаштувань
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme') as Theme;
            if (storedTheme) {
                return storedTheme;
            }
            // Перевіряємо системні налаштування (Dark Mode preference)
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light'; // За замовчуванням світла тема
    });

    useEffect(() => {
        // Застосовуємо клас теми до <html> елемента
        const root = document.documentElement;
        root.classList.remove('light', 'dark'); // Спочатку видаляємо обидва класи
        root.classList.add(theme); // Додаємо поточний клас теми
        // Зберігаємо вибір теми в localStorage
        localStorage.setItem('theme', theme);
    }, [theme]); // Ефект спрацьовує при зміні теми

    const toggleTheme = () => {
        setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};