"use server";
import { cookies } from "next/headers";

// Função que limpa os cookies da sessão
export async function logoutUser() {
  const cookieStore = cookies();
  cookieStore.delete("next-auth.callback-url");
  cookieStore.delete("next-auth.csrf-token");
  cookieStore.delete("next-auth.session-token");
  return;
}
