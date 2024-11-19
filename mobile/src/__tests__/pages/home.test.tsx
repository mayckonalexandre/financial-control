import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Home from "@/src/app/index";
import { getTransactions } from "@/src/actions/transactions/get.transactions";

const mockTransactions = [
  {
    id: 1,
    description: "Pagamento de salário",
    value: 5000,
    category: "Salário",
    origin: "Empresa XYZ",
    type: "revenue",
    date: "2023-10-01",
    payment_method: "Pix",
  },
  {
    id: 2,
    description: "Compra de supermercado",
    value: 200,
    category: "Alimentação",
    origin: "Supermercado ABC",
    type: "expense",
    date: "2023-10-02",
    payment_method: "Pix",
  },
];

jest.mock("@/src/actions/transactions/get.transactions", () => ({
  getTransactions: jest.fn(),
}));

describe("<Home />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza transações corretamente", async () => {
    (getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

    const { getByText, queryByText } = render(<Home />);

    await waitFor(() => {
      expect(queryByText("Carregando transações...")).toBeNull();
    });

    expect(getByText("Pagamento de salário")).toBeTruthy();
    expect(getByText("R$ 5000.00")).toBeTruthy();
    expect(getByText("Categoria: Salário")).toBeTruthy();
    expect(getByText("Origem: Empresa XYZ")).toBeTruthy();
    expect(getByText("Compra de supermercado")).toBeTruthy();
    expect(getByText("R$ 200.00")).toBeTruthy();
    expect(getByText("Categoria: Alimentação")).toBeTruthy();
    expect(getByText("Origem: Supermercado ABC")).toBeTruthy();
  });

  test("renderiza uma mensagem quando não há transações", async () => {
    (getTransactions as jest.Mock).mockResolvedValue(null);

    const { getByText, queryByText } = render(<Home />);

    await waitFor(() => {
      expect(queryByText("Carregando transações...")).toBeNull();
    });

    expect(getByText("Nenhuma transação disponível.")).toBeTruthy();
  });
});
