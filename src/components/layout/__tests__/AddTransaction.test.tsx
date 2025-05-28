import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTransaction from "../addTransaction";

jest.mock("../../../services/api", () => ({
  createIncome: jest.fn((payload) => Promise.resolve({ id: 1, ...payload })),
  createExpense: jest.fn((payload) => Promise.resolve({ id: 2, ...payload })),
}));

import { createIncome, createExpense } from "../../../services/api";

describe("AddTransaction Component", () => {
  const onAddTransactionMock = jest.fn();
  const onErrorClearMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Testa se o componente renderiza corretamente todos os campos e o botão
  test("Renderiza todos os campos e botão", () => {
    render(
      <AddTransaction
        onAddTransaction={onAddTransactionMock}
        errorMessage={null}
        onErrorClear={onErrorClearMock}
      />
    );

    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument();
  });

  // Testa o envio correto do formulário para uma transação de entrada
  test("Chama createIncome e onAddTransaction ao enviar formulário válido para entrada", async () => {
    render(
      <AddTransaction
        onAddTransaction={onAddTransactionMock}
        errorMessage={null}
        onErrorClear={onErrorClearMock}
      />
    );

    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: "Venda" } });
    fireEvent.change(screen.getByLabelText(/data/i), { target: { value: "2025-05-27" } });
    fireEvent.change(screen.getByLabelText(/hora/i), { target: { value: "12:00" } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: "Salário" } });

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    await waitFor(() => {
      expect(createIncome).toHaveBeenCalledWith({
        value: 100,
        description: "Venda",
        category: "Salário",
        data: "2025-05-27T12:00",
      });
      expect(onAddTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({ value: 100, description: "Venda" })
      );
    });
  });

  // Testa o envio correto do formulário para uma transação de saída após alternar o toggle
  test("Alterna para saída e chama createExpense no submit", async () => {
    render(
      <AddTransaction
        onAddTransaction={onAddTransactionMock}
        errorMessage={null}
        onErrorClear={onErrorClearMock}
      />
    );

    // Clica no toggle para mudar para saída
    fireEvent.click(screen.getByText(/entrada/i).nextSibling!); // slider

    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: "Compra" } });
    fireEvent.change(screen.getByLabelText(/data/i), { target: { value: "2025-05-27" } });
    fireEvent.change(screen.getByLabelText(/hora/i), { target: { value: "18:00" } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: "Alimentação" } });

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    await waitFor(() => {
      expect(createExpense).toHaveBeenCalledWith({
        value: 50,
        description: "Compra",
        category: "Alimentação",
        data: "2025-05-27T18:00",
      });
      expect(onAddTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({ value: 50, description: "Compra" })
      );
    });
  });

  // Testa se o botão fica desabilitado enquanto a requisição está em andamento (loading)
  test("Desabilita botão enquanto envia (loading)", async () => {
    render(
      <AddTransaction
        onAddTransaction={onAddTransactionMock}
        errorMessage={null}
        onErrorClear={onErrorClearMock}
      />
    );

    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/data/i), { target: { value: "2025-05-27" } });
    fireEvent.change(screen.getByLabelText(/hora/i), { target: { value: "12:00" } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: "Salário" } });

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /adicionar/i })).not.toBeDisabled();
    });
  });
});
