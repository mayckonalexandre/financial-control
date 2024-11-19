import { fetchCustom } from "@/src/actions/fetch";
import { getUserData, logout, User } from "@/src/actions/user";
import { Alert } from "react-native";

jest.mock("@/src/actions/user", () => ({
  getUserData: jest.fn(),
  logout: jest.fn(),
}));

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

global.fetch = jest.fn();

const mockGetUserData = getUserData as jest.MockedFunction<typeof getUserData>;
const mockLogout = logout as jest.MockedFunction<typeof logout>;
const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("fetchCustom", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockResponse = (
    status: number,
    response: object,
    contentType: string = "application/json"
  ) => {
    mockFetch.mockResolvedValueOnce({
      status,
      headers: {
        get: jest.fn().mockReturnValue(contentType),
      },
      json: jest.fn().mockResolvedValue(response),
    } as any);
  };

  test("deve fazer uma requisição bem-sucedida (GET)", async () => {
    const mockData = { id: 1, name: "Test" };

    mockResponse(200, mockData);

    const result = await fetchCustom({
      url: "https://example.com/api",
      method: "GET",
      isAuthenticated: false,
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      method: "GET",
      headers: undefined,
      body: undefined,
    });

    expect(result).toEqual({ success: true, data: mockData });
  });

  test("deve adicionar autenticação no cabeçalho se isAuthenticated for true", async () => {
    const mockUser: User = {
      access_token: "fake-token",
      id: "",
      name: "teste",
    };
    const mockData = { id: 1, name: "Test" };

    mockGetUserData.mockResolvedValue(mockUser);
    mockResponse(200, mockData);

    const result = await fetchCustom({
      url: "https://example.com/api",
      method: "GET",
      isAuthenticated: true,
    });

    expect(mockGetUserData).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      method: "GET",
      headers: {
        Authorization: "Bearer fake-token",
      },
      body: undefined,
    });

    expect(result).toEqual({ success: true, data: mockData });
  });

  test("deve retornar erro se a autenticação falhar", async () => {
    mockGetUserData.mockResolvedValue(null);

    const result = await fetchCustom({
      url: "https://example.com/api",
      method: "GET",
      isAuthenticated: true,
    });

    expect(mockGetUserData).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: false, message: "Sessão invalida!" });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("deve executar logout ao receber status 401", async () => {
    mockResponse(401, { message: "Unauthorized" });

    const result = await fetchCustom({
      url: "https://example.com/api",
      method: "GET",
      isAuthenticated: false,
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: false, message: "Unauthorized" });
  });

  test("deve lidar com erros de servidor", async () => {
    mockResponse(500, { message: "Internal Server Error" });

    const result = await fetchCustom({
      url: "https://example.com/api",
      method: "GET",
      isAuthenticated: false,
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: false,
      message: "Internal Server Error",
    });
  });

  test("deve exibir alerta em caso de exceção", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network Error"));

    const result = await fetchCustom({
      url: "https://example.com/api",
      method: "GET",
      isAuthenticated: false,
    });

    expect(mockAlert).toHaveBeenCalledWith("Erro", "Network Error");
    expect(result).toEqual({
      success: false,
      message: "Internal Server Error",
    });
  });

  test("deve lidar com requisições POST com corpo", async () => {
    const mockData = { id: 1, name: "Test" };
    const bodyData = { key: "value" };

    mockResponse(201, mockData);

    const result = await fetchCustom({
      url: "https://example.com/api",
      method: "POST",
      isAuthenticated: false,
      body: bodyData,
      header: { "Content-Type": "application/json" },
    });

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    expect(result).toEqual({ success: true, data: mockData });
  });
});
