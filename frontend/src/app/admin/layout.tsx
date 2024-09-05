import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/auth/auth.options";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  return <>{children}</>;
}
