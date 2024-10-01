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
  type: "revenue" | "expense";
  date: string;
};

export async function getTransactions() {
  let url = `${api.base_url}/transactions`;

  const req = await customFetch({
    url,
    method: "GET",
    isAuthenticated: true,
    cache: "no-cache",
    header: {
      "Content-Type": "application/json",
    },
    tags: ["transactions"],
  });

  const data: TransactionsResponse[] = req.data ?? null;

  return data;
}
