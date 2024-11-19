import { deleteTransaction } from "@/src/actions/transactions/delete.transactions";
import { fetchCustom } from "@/src/actions/fetch";
import { Alert } from "react-native";
import { api } from "@/src/config/api";

jest.mock("@/src/actions/fetch");
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockFetchCustom = fetchCustom as jest.MockedFunction<typeof fetchCustom>;
const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

describe("deleteTransaction", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockId = 123;
  const mockType = "revenue";

  test("deve deletar uma transação com sucesso e exibir notificação", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: true,
      message: "Transação deletada com sucesso!",
    });

    await deleteTransaction(mockId, mockType);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockFetchCustom).toHaveBeenCalledWith({
      url: `${api.baseUrl}/${mockType}/${mockId}`,
      method: "DELETE",
      isAuthenticated: true,
    });

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith(
      "Notificação",
      "Transação deletada com sucesso!"
    );
  });

  test("deve exibir mensagem de erro quando a API falhar", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: false,
      message: "Erro ao deletar transação!",
    });

    await deleteTransaction(mockId, mockType);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith(
      "Notificação",
      "Erro ao deletar transação!"
    );
  });

  test("deve exibir mensagem padrão de erro se a mensagem da API não estiver disponível", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: false,
    });

    await deleteTransaction(mockId, mockType);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith(
      "Notificação",
      "Erro ao deletar transação!"
    );
  });

  test("deve tratar exceções inesperadas", async () => {
    mockFetchCustom.mockRejectedValueOnce(new Error("Erro de conexão"));

    await expect(deleteTransaction(mockId, mockType)).rejects.toThrow(
      "Erro de conexão"
    );

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).not.toHaveBeenCalled();
  });
});
