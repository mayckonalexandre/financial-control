"use server";

import api from "@/config/api";
import { customFetch } from "./fetch";

export type Origin = {
  id_origin: number;
  origin: string;
};

export type Category = {
  id_category: number;
  category: string;
};

export type PaymentMethod = {
  id_payment_method: number;
  payment_method: string;
};

export async function getSources() {
  const req = await customFetch({
    url: `${api.base_url}/origin`,
    method: "GET",
    isAuthenticated: true,
    cache: "force-cache",
  });

  const data: Origin[] = req.data ?? null;

  return data;
}

export async function getCategories() {
  const req = await customFetch({
    url: `${api.base_url}/category`,
    method: "GET",
    isAuthenticated: true,
    cache: "force-cache",
  });
  const data: Category[] = req.data ?? null;

  return data;
}

export async function getPaymentMethods() {
  const req = await customFetch({
    url: `${api.base_url}/paymentmethod`,
    method: "GET",
    isAuthenticated: true,
    cache: "force-cache",
  });

  const data: PaymentMethod[] = req.data ?? null;

  return data;
}
