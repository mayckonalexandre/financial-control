import { createTransactionType } from "@/src/app/create.transaction";
import { fetchCustom } from "../fetch";
import { api } from "@/src/config/api";

import { Alert } from "react-native";

export async function createTransaction(
  data: createTransactionType
): Promise<void> {
  const newTransaction = await fetchCustom({
    url: `${api.baseUrl}/${data.type}`,
    method: "POST",
    isAuthenticated: true,
    body: data,
    header: {
      "Content-Type": "application/json",
    },
  });

  if (!newTransaction.success) {
    Alert.alert(
      "Notificação",
      newTransaction.message ?? "Erro ao criar transação!"
    );
    return;
  }

  Alert.alert("Notificação", "Transação adicionada com sucesso!");
  return;
}
