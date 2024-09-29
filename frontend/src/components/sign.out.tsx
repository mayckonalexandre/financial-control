"use client";

import { signOut } from "next-auth/react";
import { ButtonCustom } from "./default/button";

export function SignOutComponent() {
  return (
    <ButtonCustom
      value="Sair"
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-600"
    />
  );
}
