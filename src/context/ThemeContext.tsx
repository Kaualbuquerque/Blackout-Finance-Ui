import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    });

    useEffect(() => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        document.body.className = isDark ? "dark-theme" : "light-theme";
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
