"use client";

import { signIn } from "next-auth/react";
import { SyntheticEvent, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const authenticate = async (event: SyntheticEvent) => {
    event.preventDefault();

    const response = await signIn("credentials", {
      email: email.current?.value,
      password: password.current?.value,
      redirect: false,
    });
  
    if (!response?.ok) {
      alert('credenciais invalidas');
      return;
    }

    router.back();
  };

  return (
    <main className="bg-gray-900 flex justify-center items-center w-full h-screen">
      <form className="flex flex-col gap-2.5" onSubmit={authenticate}>
        <input type="email" name="email" ref={email} />
        <input type="password" name="password" ref={password} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
