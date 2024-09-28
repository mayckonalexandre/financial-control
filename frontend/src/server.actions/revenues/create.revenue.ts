"use server";

import z from "zod";
import { customFetch } from "../fetch";
import api from "@/config/api";

type CreateRevenueResponse = {
  message: string;
  success: boolean;
  error?: string;
};

export async function createRevenue(
  previousState: CreateRevenueResponse,
  formData: FormData
): Promise<CreateRevenueResponse> {
  const schema = z.object({
    category: z.string().trim().min(1, "Preencha o campo."),
    origin: z.string().trim().min(1, "Preencha o campo."),
    payment_method: z.string().trim().min(1, "Preencha o campo."),
    value: z.string().min(1, "Preencha o campo."),
    description: z.string().trim().min(1, "Preencha o campo."),
    date: z.date({ message: "Preencha o campo." }),
  });

  console.log(formData);

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

  const newRevenue = await customFetch({
    url: `${api.base_url}/revenue`,
    method: "POST",
    isAuthenticated: true,
    body: data,
    header: {
      "Content-Type": "application/json",
    },
  });

  previousState.success = true;
  previousState.message = "Receita adicionada com sucesso!";

  return previousState;
}
