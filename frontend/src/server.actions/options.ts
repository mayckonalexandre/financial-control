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
  const req: Origin[] | null = await customFetch({
    url: `${api.base_url}/origin`,
    method: "GET",
    isAuthenticated: true,
    cache: "force-cache",
  });

  return req;
}

export async function getCategories() {
  const req: Category[] | null = await customFetch({
    url: `${api.base_url}/category`,
    method: "GET",
    isAuthenticated: true,
    cache: "force-cache",
  });

  return req;
}

export async function getPaymentMethods() {
  const req: PaymentMethod[] | null = await customFetch({
    url: `${api.base_url}/paymentmethod`,
    method: "GET",
    isAuthenticated: true,
    cache: "force-cache",
  });

  return req;
}
