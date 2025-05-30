// src/context/ThemeContext.tsx  (só para referência)
// export const ThemeContext = createContext<ThemeContextType|undefined>(undefined);

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../navbar";
import { ThemeContext } from "../../../context/ThemeContext";  // ajuste o import

// mock da função de toggle
const mockToggleTheme = jest.fn();

interface RenderOptions {
  isDark?: boolean;
  toggleTheme?: () => void;
  userEmail?: string | null;
}

const renderNavbar = ({
  isDark = false,
  toggleTheme = mockToggleTheme,
  userEmail = null,
}: RenderOptions = {}) => {
  return render(
    <BrowserRouter>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <Navbar userEmail={userEmail} />
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

describe("Navbar Component", () => {
  it("should render the brand and login link when user is not logged in", () => {
    renderNavbar();
    expect(screen.getByText("BLACKOUT FINANCE")).toBeInTheDocument();
    expect(screen.getByText("Iniciar Sessão")).toBeInTheDocument();
  });

  it("should toggle theme when clicking on icon wrapper", () => {
    renderNavbar({ isDark: false, toggleTheme: mockToggleTheme });
    // captura o wrapper clicável a partir do ícone
    const sunImg = screen.getByRole("img", { name: "Sun Icon" });
    const iconWrapper = sunImg.parentElement!;
    fireEvent.click(iconWrapper);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("should display user email when logged in", () => {
    const email = "user@example.com";
    renderNavbar({ userEmail: email });
    expect(screen.getByText("Bem-vindo,")).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
  });
});
