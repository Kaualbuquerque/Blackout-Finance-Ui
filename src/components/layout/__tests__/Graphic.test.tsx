import { render, screen } from "@testing-library/react";
import Graphic from "../graphic";
import { ChartData } from "chart.js";

// Mock do componente Chart para testar título e evitar problemas com canvas
jest.mock("react-chartjs-2", () => ({
  Chart: (props: any) => {
    return <div data-testid="mock-chart">{props.options.plugins.title.text}</div>;
  },
}));

// Função auxiliar que transforma dados de transações em dados para o gráfico
// Essa função é exemplo para nosso teste unitário
export function transformDataForChart(transactions: { category: string; amount: number }[]) {
  const categories = Array.from(new Set(transactions.map((t) => t.category)));
  const data = categories.map((cat) => {
    return transactions.filter((t) => t.category === cat).reduce((sum, t) => sum + t.amount, 0);
  });

  return {
    labels: categories,
    datasets: [
      {
        label: "Amount",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
}

describe("Graphic Component", () => {
  const sampleTransactions = [
    { category: "Food", amount: 50 },
    { category: "Food", amount: 100 },
    { category: "Transport", amount: 75 },
  ];

  const chartData: ChartData = transformDataForChart(sampleTransactions);

  // Testa se o componente renderiza o gráfico (mock) com o título correto
  it("should render the chart with the correct title", () => {
    render(<Graphic data={chartData} title="Sample Chart" />);
    const mockChart = screen.getByTestId("mock-chart");
    expect(mockChart).toHaveTextContent("Sample Chart");
  });

  // Testa se o título do gráfico atualiza quando a prop title é alterada
  it("should update the title when prop changes", () => {
    const { rerender } = render(<Graphic data={chartData} title="Initial Title" />);
    expect(screen.getByTestId("mock-chart")).toHaveTextContent("Initial Title");

    // Rerenderiza o componente com um novo título
    rerender(<Graphic data={chartData} title="Updated Title" />);
    expect(screen.getByTestId("mock-chart")).toHaveTextContent("Updated Title");
  });

  describe("transformDataForChart function", () => {
    // Testa se a função transforma corretamente um array de transações em dados de gráfico
    it("should correctly transform transactions into chart data", () => {
      const transformed = transformDataForChart(sampleTransactions);

      expect(transformed.labels).toEqual(["Food", "Transport"]);
      expect(transformed.datasets[0].data).toEqual([150, 75]);
    });

    // Testa se a função retorna arrays vazios quando não recebe nenhuma transação
    it("should return empty arrays when given empty transactions", () => {
      const transformed = transformDataForChart([]);
      expect(transformed.labels).toEqual([]);
      expect(transformed.datasets[0].data).toEqual([]);
    });
  });
});
