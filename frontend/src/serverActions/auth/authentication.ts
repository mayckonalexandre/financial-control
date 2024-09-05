"use server";

export async function Authentication(email: string, password: string) {
  const response = await fetch("http://localhost:3333/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-cache",
  });

  if (response.status != 200)
    return { success: false, message: response.statusText };

  const { access_token, name }: { access_token: string; name: string } =
    await response.json();

  return { access_token, name };
}
