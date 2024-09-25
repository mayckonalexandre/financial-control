import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/config/auth/provider";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "Aplicação para controle financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.className} bg-gray-950 text-white p-2.5`}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
