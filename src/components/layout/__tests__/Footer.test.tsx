import { render, screen } from "@testing-library/react";
import Footer from "../footer";

// Simula a função de ano atual
const getCurrentYear = () => new Date().getFullYear();

describe("Footer Component", () => {
  
  test("should render section titles correctly", () => {
    render(<Footer />);

    expect(screen.getByText(/Social/i)).toBeInTheDocument();
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
    expect(screen.getByText(/Ajuda/i)).toBeInTheDocument();
    expect(screen.getByText(/Jurídico/i)).toBeInTheDocument();
  });

  test("should render social media icons", () => {
    render(<Footer />);
    
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(3); // Espera 3 ícones

    images.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });

  test("should render copyright text", () => {
    render(<Footer />);
    const year = getCurrentYear();

    expect(
      screen.getByText(`Copyright © ${year} Blackout Finances`)
    ).toBeInTheDocument();
  });
});
