"use server";

import z from "zod";
import { customFetch } from "../fetch";
import api from "@/config/api";
import { revalidateTag } from "next/cache";

type CreateTransactionResponse = {
  message: string;
  success: boolean;
  error?: string;
};

export async function createTransaction(
  previousState: CreateTransactionResponse,
  formData: FormData
): Promise<CreateTransactionResponse> {
  const schema = z.object({
    type: z
      .enum(["Receita", "Despesa"])
      .transform((value) => (value === "Receita" ? "revenue" : "expense")),
    category: z.string().trim().min(1, "Preencha o campo."),
    origin: z.string().trim().min(1, "Preencha o campo."),
    payment_method: z.string().trim().min(1, "Preencha o campo."),
    value: z
      .string()
      .min(1, "Preencha o campo.")
      .transform((value) => Number(value)),
    description: z.string().trim().min(1, "Preencha o campo."),
    date: z.string().trim().min(1, "Preencha o campo."),
  });

  const { success, data, error } = schema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!success) {
    const formatedError = error.issues.reduce((prev, current) => {
      prev[current.path[0]] = current.message;

      return prev;
    }, {} as { [key: string]: string });

    previousState.success = false;
    previousState.error = JSON.stringify(formatedError);

    return previousState;
  }

  const newTransaction = await customFetch({
    url: `${api.base_url}/${data.type}`,
    method: "POST",
    isAuthenticated: true,
    body: data,
    header: {
      "Content-Type": "application/json",
    },
  });

  if (newTransaction.success === false) {
    previousState.success = false;
    previousState.message =
      newTransaction.message ?? "Erro ao criar transação!";

    return previousState;
  }

  revalidateTag("transactions");

  previousState.success = true;
  previousState.message = "Transação adicionada com sucesso!";

  return previousState;
}
