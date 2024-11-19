import { fetchCustom } from "../fetch";
import { api } from "@/src/config/api";

export type Transactions = {
  id: number;
  description: string;
  value: number;
  category: string;
  origin: string;
  payment_method: string;
  type: "revenue" | "expense";
  date: string;
};

export async function getTransactions() {
  const url = `${api.baseUrl}/transactions`;

  const req = await fetchCustom({
    url,
    method: "GET",
    isAuthenticated: true,
    header: { "Content-Type": "application/json" },
  });
  
  const transactions: Transactions[] = await req.data;

  return transactions ?? null;
}
