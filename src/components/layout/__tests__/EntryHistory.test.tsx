import { render, screen, fireEvent } from "@testing-library/react";
import EntryHistory from "../entryHistory";
import { Transaction } from "../../../services/api";

describe("EntryHistory component", () => {
  const mockTransaction: Transaction = {
    id: 1,
    tipo: "Entrada",
    categoria: "Salário",
    descricao: "Pagamento de abril",
    data: "2024-04-30T12:00:00.000Z",
    valor: "3000"
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(<EntryHistory transaction={mockTransaction} onDelete={mockOnDelete} />);
  });

  // Testa se todos os dados da transação são renderizados corretamente
  it("renders all transaction data correctly", () => {
    expect(screen.getByText("Salário")).toBeInTheDocument();
    expect(screen.getByText("Pagamento de abril")).toBeInTheDocument();
    expect(screen.getByText("R$3000")).toBeInTheDocument();
    expect(screen.getByText("30/04/2024")).toBeInTheDocument();
    
    const entryHistoryElement = screen.getByText('Salário').closest('div');
    expect(entryHistoryElement).toHaveClass("entrada")
  });

  // Testa se a função onDelete é chamada ao clicar no ícone de lixeira
  it("calls onDelete when trash icon is clicked", () => {
    const trashIcon = screen.getByTitle("Excluir transação");
    fireEvent.click(trashIcon);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
