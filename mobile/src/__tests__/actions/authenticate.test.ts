import AsyncStorage from "@react-native-async-storage/async-storage";
import { authentication } from "@/src/actions/authenticate";
import { api } from "@/src/config/api";

jest.mock("@react-native-async-storage/async-storage");
global.fetch = jest.fn();

describe("Test actions authenticate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Success", async () => {
    const data = { email: "teste@teste.com", password: "123" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({
        access_token: "teste_token",
        name: "teste",
        id: "teste_id",
      }),
    });

    const auth = await authentication(data.email, data.password);

    expect(fetch).toHaveBeenCalledWith(`${api.baseUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });

    expect(auth).toEqual({
      access_token: "teste_token",
      name: "teste",
      id: "teste_id",
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify({
        access_token: "teste_token",
        name: "teste",
        id: "teste_id",
      })
    );
  });

  test("Failure - Invalid credentials", async () => {
    const data = { email: "teste@teste.com", password: "123" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 401,
      statusText: "Unauthorized",
    });

    const auth = await authentication(data.email, data.password);

    expect(auth).toEqual({
      success: false,
      message: "Unauthorized",
    });
  });

  test("Failure - Network error", async () => {
    const data = { email: "teste@teste.com", password: "123" };

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const auth = await authentication(data.email, data.password);

    expect(auth).toEqual({
      success: false,
      message: "Network Error",
    });
  });
});
