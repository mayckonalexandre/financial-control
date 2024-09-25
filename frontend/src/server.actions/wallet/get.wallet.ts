"use server";

import api from "@/config/api";
import { customFetch } from "../fetch";

type WalletResponse = {
  id_wallet: string;
  user_id: string;
  value: number;
};

export async function getWallet() {
  const url = `${api.base_url}/wallet`;

  const wallet: WalletResponse = await customFetch({
    url,
    method: "GET",
    isAuthenticated: true,
    header: {
      "Content-Type": "application/json",
    },
    tags: ["wallet"],
  });

  return wallet;
}
