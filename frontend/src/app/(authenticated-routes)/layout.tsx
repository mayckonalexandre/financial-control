import Header from "@/components/default/header";
import { authOptions } from "@/config/auth/auth.options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import React from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  return (
    <React.Fragment>
      <Header user={session.user} />
      {children}
    </React.Fragment>
  );
}
