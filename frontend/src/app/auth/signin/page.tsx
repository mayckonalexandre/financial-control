"use client";

import { ButtonCustom } from "@/components/default/button";
import { InputCustom } from "@/components/default/input";
import { Toast } from "@/components/default/toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const schemaLogin = z.object({
  email: z.string().email("Email inválido.").trim(),
  password: z.string().trim().min(1, "Preencha o campo."),
});

type schemaLoginType = z.infer<typeof schemaLogin>;

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaLoginType>({ resolver: zodResolver(schemaLogin) });

  const router = useRouter();

  const authenticate = async (data: schemaLoginType) => {
    const { email, password } = data;
    const previousUrl = document.referrer || "/";

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response?.ok)
      return Toast({
        message:
          "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.",
        type: "warning",
      });

    router.push(previousUrl);
  };

  return (
    <main className="flex justify-center items-center w-full h-screen text-white">
      <form
        className="flex flex-col gap-4 border-2 border-gray-700 rounded-lg p-6 shadow-lg bg-gray-900 max-w-md w-full"
        onSubmit={handleSubmit(authenticate)}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <InputCustom
          type="email"
          placeholder="Email"
          register={register}
          registerName="email"
          className="border-gray-600 bg-gray-800 text-white"
        />

        <span className="text-red-500 text-sm">
          {errors.email?.message?.toString()}
        </span>

        <InputCustom
          type="password"
          placeholder="Password"
          register={register}
          registerName="password"
          className="border-gray-600 bg-gray-800 text-white"
        />

        <span className="text-red-500 text-sm">
          {errors.password?.message?.toString()}
        </span>

        <span className="flex items-center justify-center w-full gap-2.5">
          Não Possui uma conta ? <Link href="/auth/register">Cadastre-se</Link>
        </span>

        <ButtonCustom
          value="Login"
          type="submit"
          className="bg-orange-600 hover:bg-orange-700"
        />
      </form>
    </main>
  );
}
