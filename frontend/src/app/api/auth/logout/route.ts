"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Função que limpa os cookies da sessão
export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete("next-auth.callback-url");
  cookieStore.delete("next-auth.csrf-token");
  cookieStore.delete("next-auth.session-token");
  redirect("/");
}
