import { api } from "../config/api";
import { fetchCustom } from "./fetch";

export type WalletType = {
  id_wallet: string;
  user_id: string;
  value: number;
};

export async function getWallet(): Promise<WalletType | null> {
  const url = `${api.baseUrl}/wallet`;

  const req = await fetchCustom({
    method: "GET",
    url,
    isAuthenticated: true,
    header: {
      "Content-Type": "application/json",
    },
  });

  if (!req.data) return null;

  return req.data;
}
