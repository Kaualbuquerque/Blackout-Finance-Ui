import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../navbar";

// Mock da função de mudança de tema
const mockSetIsDark = jest.fn();

const renderNavbar = (props = {}) => {
  return render(
    <BrowserRouter>
      <Navbar {...props} />
    </BrowserRouter>
  );
};

describe("Navbar Component", () => {

  // 🧪 1. Teste de Renderização
  it("should render the brand and login link when user is not logged in", () => {
    renderNavbar();

    expect(screen.getByText("BLACKOUT FINANCE")).toBeInTheDocument();
    expect(screen.getByText("Iniciar Sessão")).toBeInTheDocument();
  });

  // 🧪 2. Teste de Interação
  it("should toggle theme when clicking on icon wrapper", () => {
    renderNavbar({ isDark: false, setIsDark: mockSetIsDark });

    const iconWrapper = screen.getByRole("img", { name: "Sun Icon" }).parentElement!;
    fireEvent.click(iconWrapper);

    expect(mockSetIsDark).toHaveBeenCalledTimes(1);
  });

  // 🧪 3. Teste Unitário de lógica condicional
  it("should display user email when logged in", () => {
    const email = "user@example.com";
    renderNavbar({ userEmail: email });

    expect(screen.getByText("Bem-vindo,")).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
  });

});
