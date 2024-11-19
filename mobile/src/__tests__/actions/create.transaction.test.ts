import { createTransaction } from "@/src/actions/transactions/create.transaction";
import { fetchCustom } from "@/src/actions/fetch";
import { Alert } from "react-native";
import { api } from "@/src/config/api";
import { createTransactionType } from "@/src/app/create.transaction";

jest.mock("@/src/actions/fetch");
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockFetchCustom = fetchCustom as jest.MockedFunction<typeof fetchCustom>;
const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

describe("createTransaction", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockTransactionData: createTransactionType = {
    type: "revenue",
    value: 300,
    date: "2024-01-01",
    category: "teste",
    origin: "teste",
    payment_method: "Pix",
    description: "teste",
  };

  test("deve criar uma transação com sucesso e exibir notificação", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: true,
      message: "Transação criada com sucesso!",
    });

    await createTransaction(mockTransactionData);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockFetchCustom).toHaveBeenCalledWith({
      url: `${api.baseUrl}/${mockTransactionData.type}`,
      method: "POST",
      isAuthenticated: true,
      body: mockTransactionData,
      header: {
        "Content-Type": "application/json",
      },
    });

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith(
      "Notificação",
      "Transação adicionada com sucesso!"
    );
  });

  test("deve exibir mensagem de erro se a criação falhar", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: false,
      message: "Erro ao criar transação!",
    });

    await createTransaction(mockTransactionData);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith(
      "Notificação",
      "Erro ao criar transação!"
    );
  });

  test("deve exibir mensagem padrão de erro se a mensagem não estiver disponível", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: false,
    });

    await createTransaction(mockTransactionData);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith(
      "Notificação",
      "Erro ao criar transação!"
    );
  });

  test("deve tratar exceções inesperadas", async () => {
    mockFetchCustom.mockRejectedValueOnce(new Error("Erro de conexão"));

    await expect(createTransaction(mockTransactionData)).rejects.toThrow(
      "Erro de conexão"
    );

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).not.toHaveBeenCalled();
  });
});
