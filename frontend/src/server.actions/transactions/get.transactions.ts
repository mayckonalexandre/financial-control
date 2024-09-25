"use server";

import api from "@/config/api";
import { customFetch } from "../fetch";

type TransactionsResponse = {
  id: number;
  description: string;
  value: number;
  category: string;
  origin: string;
  payment_method: string;
  type: string;
};

export async function getTransactions() {
  let url = `${api.base_url}/transactions`;

  const transactions: TransactionsResponse[] | null = await customFetch({
    url,
    method: "GET",
    isAuthenticated: true,
    cache: "no-cache",
    header: {
      "Content-Type": "application/json",
    },
  });

  return transactions;
}
