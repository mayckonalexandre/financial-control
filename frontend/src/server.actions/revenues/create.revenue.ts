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
    category_id: z
      .string()
      .trim()
      .min(1, "Preencha o campo.")
      .transform((value) => Number(value)),
    origin_id: z
      .string()
      .trim()
      .min(1, "Preencha o campo.")
      .transform((value) => Number(value)),
    payment_method_id: z
      .string()
      .trim()
      .min(1, "Preencha o campo.")
      .transform((value) => Number(value)),
    value: z.number().min(1, "Preencha o campo."),
    description: z.string().trim().min(1, "Preencha o campo."),
    date: z.date(),
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

    return {
      message: "",
      success: false,
      error: JSON.stringify(formatedError),
    };
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

  return {
    success: true,
    message: "Receita adicionada com sucesso!",
  };
}
