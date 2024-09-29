"use server";

import api from "@/config/api";
import { redirect } from "next/navigation";
import z from "zod";

type CreateAccountResponse = {
  message: string;
  success: boolean;
  error?: string;
};

export async function createAccount(
  previousState: CreateAccountResponse,
  formData: FormData
): Promise<CreateAccountResponse> {
  const schema = z
    .object({
      name: z.string().trim().min(1, "Preencha o campo."),
      email: z.string().email("Email inválido.").trim(),
      password: z.string().trim().min(1, "Preencha o campo."),
      confirmPassword: z.string().min(1, "Preencha o campo."),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "As senhas não coindidem.",
          path: ["confirmPassword"],
        });
      }
    });

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

  const { name, email, password } = data;

  const req = await fetch(`${api.base_url}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    cache: "no-cache",
  });

  if (req.status != 201) {
    const res = await req.json();
    return {
      success: false,
      message: res.message,
    };
  }

  redirect("/auth/signin");
}
