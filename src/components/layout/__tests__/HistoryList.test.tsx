import { render, screen, fireEvent } from "@testing-library/react";
import HistoryList from "../historyList";
import { Transaction } from "../../../services/api";

describe("HistoryList component", () => {
    const mockTransactions: Transaction[] = [
        { id: 1, categoria: "Salário", valor: "5000", tipo: "Entrada", data: "2024-09-01", descricao: "" },
        { id: 2, categoria: "Aluguel", valor: "1500", tipo: "Saída", data: "2024-09-05", descricao: "" }
    ];

    const mockOnDelete = jest.fn();

    // Teste 1: Verifica se todas as transações são renderizadas corretamente
    it("renderiza todas as transações corretamente", () => {
        render(<HistoryList transactions={mockTransactions} onDelete={mockOnDelete} />);

        expect(screen.getByText("Salário")).toBeInTheDocument();
        expect(screen.getByText("Aluguel")).toBeInTheDocument();
    });

    // Teste 2: Verifica se a função onDelete é chamada corretamente ao clicar no botão de exclusão
    it("dispara a função onDelete quando uma transação é excluída", () => {
        render(<HistoryList transactions={mockTransactions} onDelete={mockOnDelete} />);

        // Procura todos os botões de exclusão e clica no primeiro
        const deleteButtons = screen.getAllByAltText("Excluir");
        fireEvent.click(deleteButtons[0]);

        expect(mockOnDelete).toHaveBeenCalledWith(1, "Entrada");
    });
});
