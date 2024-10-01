"use server";

import api from "@/config/api";
import { customFetch } from "../fetch";
import { revalidateTag } from "next/cache";

export async function deleteRevenue(
  id_revenue: number
): Promise<{ success: boolean; message: string }> {
  const url = `${api.base_url}/revenue/${id_revenue}`;

  const request = await customFetch({
    url,
    method: "DELETE",
    isAuthenticated: true,
    cache: "no-cache",
    header: {
      "Content-Type": "application/json",
    },
  });

  if (request && request.success === false)
    return {
      success: false,
      message: request.message ?? "Erro ao deletar receita!",
    };

  revalidateTag("transactions");

  return { success: true, message: "Receita deletada!" };
}
