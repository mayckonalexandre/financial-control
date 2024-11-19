import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CreateTransaction from "@/src/app/create.transaction";

describe("<CreateTransaction />", () => {
  test("deve renderizar todos os campos e o botão de cadastrar", () => {
    const { getByPlaceholderText, getByText } = render(<CreateTransaction />);

    expect(
      getByPlaceholderText("Descrição da transação (Ex: Salário, Aluguel)")
    ).toBeTruthy();
    expect(
      getByPlaceholderText("Valor da transação (Ex: 3000.00)")
    ).toBeTruthy();
    expect(
      getByPlaceholderText("Categoria (Ex: Alimentação, Transporte)")
    ).toBeTruthy();
    expect(
      getByPlaceholderText("Origem/Destino (Ex: Fulano, Supermercado)")
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        "Método de pagamento (Ex: Cartão de crédito, Dinheiro, Pix)"
      )
    ).toBeTruthy();
    expect(getByText("Cadastrar")).toBeTruthy();
  });

  test("deve exibir mensagens de erro para campos obrigatórios vazios", async () => {
    const { getByText } = render(<CreateTransaction />);

    fireEvent.press(getByText("Cadastrar"));

    await waitFor(() => {
      expect(getByText("Informe a descrição")).toBeTruthy();
      expect(getByText("Informe o valor")).toBeTruthy();
      expect(getByText("Informe a categoria")).toBeTruthy();
      expect(getByText("Informe a origem")).toBeTruthy();
      expect(getByText("Informe o método de pagamento")).toBeTruthy();
      expect(getByText("Preencha o campo")).toBeTruthy();
      expect(getByText("Informe a data")).toBeTruthy();
    });
  });
});
