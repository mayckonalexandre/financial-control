import { createAccount } from "@/src/actions/create.account";
import { fetchCustom } from "@/src/actions/fetch";
import { Alert } from "react-native";
import { api } from "@/src/config/api";
import { router } from "expo-router";

jest.mock("@/src/actions/fetch");
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

const mockFetchCustom = fetchCustom as jest.MockedFunction<typeof fetchCustom>;
const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;
const mockRouterPush = router.push as jest.MockedFunction<typeof router.push>;

describe("createAccount", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockAccountData = {
    name: "teste",
    email: "teste@teste.com",
    password: "senha123",
  };

  test("deve criar uma conta com sucesso e redirecionar para a página de login", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: true,
    });

    await createAccount(mockAccountData);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockFetchCustom).toHaveBeenCalledWith({
      url: `${api.baseUrl}/user`,
      method: "POST",
      isAuthenticated: false,
      header: {
        "Content-Type": "application/json",
      },
      body: mockAccountData,
    });

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
    expect(mockAlert).not.toHaveBeenCalled();
  });

  test("deve exibir mensagem de erro quando a API retorna falha", async () => {
    mockFetchCustom.mockResolvedValueOnce({
      success: false,
      message: "Erro ao criar conta",
    });

    await createAccount(mockAccountData);

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Error", "Erro ao criar conta");
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  test("deve tratar exceções inesperadas", async () => {
    mockFetchCustom.mockRejectedValueOnce(new Error("Erro de conexão"));

    await expect(createAccount(mockAccountData)).rejects.toThrow(
      "Erro de conexão"
    );

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockAlert).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
