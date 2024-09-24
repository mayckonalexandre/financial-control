"use client";

import { ButtonCustom } from "@/components/default/button";
import { InputCustom } from "@/components/default/input";
import { createAccount } from "@/server.actions/user/create.account";
import { useFormState } from "react-dom";
import { Toast } from "@/components/default/toastify";

export default function CreateAccount() {
  const [state, formAction] = useFormState(createAccount, {
    message: "",
    success: false,
    error: "",
  });

  const error = state.error ? JSON.parse(state.error) : null;

  if (state.message)
    state.success
      ? Toast({ message: state.message, type: "success" })
      : Toast({ message: state.message, type: "error" });

  return (
    <main className="flex justify-center items-center w-full h-screen text-white">
      <form
        className="flex flex-col gap-4 border-2 border-gray-700 rounded-lg p-6 shadow-lg bg-gray-900 max-w-md w-full"
        action={formAction}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Crie sua conta</h2>

        <InputCustom
          type="text"
          placeholder="Nome"
          registerName="name"
          className="border-gray-600 bg-gray-800 text-white"
        />

        <span className="text-red-500 text-sm">{error?.name?.toString()}</span>

        <InputCustom
          type="email"
          placeholder="Email"
          registerName="email"
          className="border-gray-600 bg-gray-800 text-white"
        />

        <span className="text-red-500 text-sm">{error?.email?.toString()}</span>

        <InputCustom
          type="password"
          placeholder="Password"
          registerName="password"
          className="border-gray-600 bg-gray-800 text-white"
        />

        <span className="text-red-500 text-sm">
          {error?.password?.toString()}
        </span>

        <InputCustom
          type="password"
          placeholder="Confirme sua senha"
          registerName="confirmPassword"
          className="border-gray-600 bg-gray-800 text-white"
        />

        <span className="text-red-500 text-sm">
          {error?.confirmPassword?.toString()}
        </span>

        <ButtonCustom
          type="submit"
          value="Criar Conta"
          className="bg-orange-600 hover:bg-orange-700"
        />
      </form>
    </main>
  );
}
