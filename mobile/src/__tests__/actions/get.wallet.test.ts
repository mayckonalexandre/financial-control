import { fetchCustom } from "@/src/actions/fetch";
import { getWallet } from "@/src/actions/get.wallet";
import { api } from "@/src/config/api";

jest.mock("@/src/actions/fetch");

const mockFetchCustom = fetchCustom as jest.MockedFunction<typeof fetchCustom>;

describe("getWallet", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve retornar os dados da carteira quando a API responde corretamente", async () => {
    const mockResponse = {
      data: {
        id_wallet: "12345",
        user_id: "user123",
        value: 100.5,
      },
      success: true,
    };

    mockFetchCustom.mockResolvedValueOnce(mockResponse);

    const wallet = await getWallet();

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(mockFetchCustom).toHaveBeenCalledWith({
      method: "GET",
      url: `${api.baseUrl}/wallet`,
      isAuthenticated: true,
      header: {
        "Content-Type": "application/json",
      },
    });

    expect(wallet).toEqual(mockResponse.data);
  });

  test("deve retornar null quando a API não retornar dados", async () => {
    mockFetchCustom.mockResolvedValueOnce({ data: null, success: false });

    const wallet = await getWallet();

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
    expect(wallet).toBeNull();
  });

  test("deve lançar um erro quando a chamada à API falhar", async () => {
    mockFetchCustom.mockRejectedValueOnce(new Error("Erro na API"));

    await expect(getWallet()).rejects.toThrow("Erro na API");

    expect(mockFetchCustom).toHaveBeenCalledTimes(1);
  });
});
