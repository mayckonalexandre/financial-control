"use server";

import api from "@/config/api";

export async function Authentication(email: string, password: string) {
  const response = await fetch(`${api.base_url}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-cache",
  });

  if (response.status != 200)
    return { success: false, message: response.statusText };

  const {
    access_token,
    name,
    id,
  }: { access_token: string; name: string; id: string } = await response.json();

  return { access_token, name, id };
}
