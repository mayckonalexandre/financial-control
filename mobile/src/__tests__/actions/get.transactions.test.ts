import { getTransactions } from "@/src/actions/transactions/get.transactions";
import { fetchCustom } from "@/src/actions/fetch";
import { api } from "@/src/config/api";

jest.mock("@/src/actions/fetch");

const mockFetchCustom = fetchCustom as jest.MockedFunction<typeof fetchCustom>;

describe("getTransactions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve retornar uma lista de transações quando a API responde corretamente", async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          description: "Salário",
          value: 5000,
          category: "Trabalho",
          origin: "Empresa",
          payment_method: "Pix",
          type: "revenue",
          date: "2024-01-01",
        },
        {
          id: 2,
          description: "Aluguel",
          value: -1500,
          category: "Moradia",
          origin: "Conta corrente",
          payment_method: "TED",
          type: "expense",
          date: "2024-01-02",
        },
      ],
      success: true,
    };

    mockFetchCustom.mockResolvedValueOnce(mockResponse);

    const transactions = await getTransactions();

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockFetchCustom).toHaveBeenCalledWith({
      url: `${api.baseUrl}/transactions`,
      method: "GET",
      isAuthenticated: true,
      header: { "Content-Type": "application/json" },
    });
    expect(transactions).toEqual(mockResponse.data);
  });

  test("deve lançar um erro quando a API não retorna dados", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      data: null,
      success: false,
    });

    const transactions = await getTransactions();

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(transactions).toBeNull();
  });
});
