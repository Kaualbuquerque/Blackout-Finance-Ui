import { render, screen } from "@testing-library/react";
import TotalFinances from "../totalFinances";

describe("TotalFinances Component", () => {

    // Testa se o componente renderiza corretamente para o tipo "income"
    test("renders correctly for income type", () => {
        render(<TotalFinances type="income" value={5000} />);

        expect(screen.getByText("Poupança Atual")).toBeInTheDocument();
        expect(screen.getByText("R$5000")).toBeInTheDocument();
        
        // Verifica se a imagem está na tela, sem testar src
        const imgExpense = screen.getByAltText("");
        expect(imgExpense).toBeInTheDocument();
    });

    // Testa se o componente renderiza corretamente para o tipo "expense"
    test("renders correctly for expense type", () => {
        render(<TotalFinances type="expense" value={3000} />);

        expect(screen.getByText("Contas pagas")).toBeInTheDocument();
        expect(screen.getByText("R$3000")).toBeInTheDocument();

        // Verifica se a imagem está na tela, sem testar src
        const imgExpense = screen.getByAltText("");
        expect(imgExpense).toBeInTheDocument();
    });


});
