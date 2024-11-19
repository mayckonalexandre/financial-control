import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CreateAccount from "@/src/app/create.account";
import { router } from "expo-router";
import { createAccount } from "@/src/actions/create.account";

jest.mock("@/src/actions/create.account", () => ({
  createAccount: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("<CreateAccount />", () => {
  test("deve renderizar os campos de entrada e o botão de criar", () => {
    const { getByPlaceholderText, getByText } = render(<CreateAccount />);

    expect(getByPlaceholderText("Informe seu nome")).toBeTruthy();
    expect(getByPlaceholderText("Digite seu email")).toBeTruthy();
    expect(getByPlaceholderText("Digite sua senha")).toBeTruthy();
    expect(getByPlaceholderText("Confirme sua senha")).toBeTruthy();

    expect(getByText("Criar")).toBeTruthy();
  });

  test("deve exibir mensagens de erro para campos obrigatórios vazios", async () => {
    const { getByText } = render(<CreateAccount />);

    fireEvent.press(getByText("Criar"));

    await waitFor(
      () => {
        expect(getByText("Infome seu nome")).toBeTruthy();
        expect(getByText("Informe seu email")).toBeTruthy();
        expect(getByText("Informe sua senha")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  test("deve exibir mensagem de erro se as senhas não coincidirem", async () => {
    const { getByText, getByPlaceholderText } = render(<CreateAccount />);

    fireEvent.changeText(getByPlaceholderText("Informe seu nome"), "Teste");
    fireEvent.changeText(
      getByPlaceholderText("Digite seu email"),
      "teste@exemplo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Digite sua senha"), "Senha123!");
    fireEvent.changeText(
      getByPlaceholderText("Confirme sua senha"),
      "Senha123@"
    );

    fireEvent.press(getByText("Criar"));

    await waitFor(() =>
      expect(getByText("As senhas não coindidem.")).toBeTruthy()
    );
  });

  test("deve chamar a função de criação de conta ao submeter dados válidos", async () => {
    const { getByText, getByPlaceholderText } = render(<CreateAccount />);

    fireEvent.changeText(getByPlaceholderText("Informe seu nome"), "Teste");
    fireEvent.changeText(
      getByPlaceholderText("Digite seu email"),
      "teste@exemplo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Digite sua senha"), "Senha123!");
    fireEvent.changeText(
      getByPlaceholderText("Confirme sua senha"),
      "Senha123!"
    );

    fireEvent.press(getByText("Criar"));

    await waitFor(() =>
      expect(createAccount).toHaveBeenCalledWith({
        name: "Teste",
        email: "teste@exemplo.com",
        password: "Senha123!",
        confirmPassword: "Senha123!",
      })
    );
  });

  test("deve navegar para a tela de login ao clicar em 'Já possui uma conta ?'", () => {
    const { getByText } = render(<CreateAccount />);

    fireEvent.press(getByText("Já possui uma conta ?"));

    expect(router.push).toHaveBeenCalledWith("/login");
  });
});
