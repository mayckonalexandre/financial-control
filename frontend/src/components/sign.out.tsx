"use client"

import { signOut } from "next-auth/react";

export function SignOutComponent() {
  return <button onClick={() => signOut()}>Sair</button>;
}
