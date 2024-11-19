import { Alert } from "react-native";
import { fetchCustom } from "../fetch";
import { api } from "@/src/config/api";

export async function deleteTransaction(
  id: number,
  type: "revenue" | "expense"
): Promise<void> {
  const url = `${api.baseUrl}/${type}/${id}`;

  const request = await fetchCustom({
    url,
    method: "DELETE",
    isAuthenticated: true,
  });

  if (!request.success) {
    Alert.alert("Notificação", request.message ?? "Erro ao deletar transação!");
    return;
  }

  Alert.alert("Notificação", "Transação deletada com sucesso!");
  return;
}
