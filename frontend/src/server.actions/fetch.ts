"use server";

import { authOptions } from "@/config/auth/auth.options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type customFetchType = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  header?: HeadersInit;
  tags?: string[];
  cache?: RequestCache;
  isAuthenticated: boolean;
};

const acceptedStatuses = [200, 201];

export async function customFetch(data: customFetchType) {
  let { url, method, header, body, cache, tags, isAuthenticated } = data;

  if (isAuthenticated) {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    header = {
      ...(header || {}),
      Authorization: "Bearer " + session.user.access_token,
    };
  }

  const req = await fetch(url, {
    method: method,
    headers: header,
    body:
      method === "POST" || method === "PUT"
        ? body
          ? JSON.stringify(body)
          : undefined
        : undefined,
    cache: cache,
    next: {
      tags: tags,
    },
  });

  if (req.status === 401) redirect("/api/auth/logout");
  if (!acceptedStatuses.includes(req.status)) return null;

  return await req.json();
}
