"use server";

import api from "@/config/api";
import { customFetch } from "../fetch";

type RevenuesResponse = {
  id_revenue: number;
  description: string;
  value: number;
  category: string;
  origin: string;
  payment_method: string;
};

export async function getRevenues(id_revenue?: string) {
  let url = `${api.base_url}/revenue`;

  if (id_revenue) url = url + `/?id_revenue=${id_revenue}`;

  const req = await customFetch({
    url,
    method: "GET",
    isAuthenticated: true,
    cache: "no-cache",
    tags: ["revenues"],
    header: {
      "Content-Type": "application/json",
    },
  });

  const data: RevenuesResponse[] = req.data ?? null;

  return data;
}
