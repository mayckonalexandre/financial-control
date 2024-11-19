import Login from "@/src/app/login";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { authentication } from "@/src/actions/authenticate";

jest.mock("@/src/actions/authenticate", () => ({
  authentication: jest
    .fn()
    .mockReturnValue({ access_token: "teste", name: "teste", id: "teste" }),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("<Login />", () => {
  test("renderiza a tela de login corretamente", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    getByText("Login");

    getByPlaceholderText("Digite seu email");
    getByPlaceholderText("Digite sua senha");

    getByText("Entrar");
  });

  test("exibe mensagens de erro quando os campos estão vazios", async () => {
    const { getByText } = render(<Login />);

    const submitButton = getByText("Entrar");

    fireEvent.press(submitButton);

    await waitFor(() => {
      getByText("Informe seu email.");
      getByText("Informe sua senha.");
    });
  });

  test("chama a função de envio com dados corretos", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText("Digite seu email");
    const passwordInput = getByPlaceholderText("Digite sua senha");
    const submitButton = getByText("Entrar");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(authentication).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });
});
