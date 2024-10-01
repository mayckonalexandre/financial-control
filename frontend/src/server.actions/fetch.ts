"use server";

import { authOptions } from "@/config/auth/auth.options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type ResponseFetch = {
  success: boolean;
  message?: string;
  data?: any;
};

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

export async function customFetch(
  data: customFetchType
): Promise<ResponseFetch> {
  let { url, method, header, body, cache, tags, isAuthenticated } = data;

  if (isAuthenticated) {
    const session = await getServerSession(authOptions);

    if (!session) return { success: false, message: "Sessão invalida!" };

    header = {
      ...(header || {}),
      Authorization: "Bearer " + session.user.access_token,
    };
  }

  try {
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

    if (req.status === 401) throw new Error("Invalid session!");

    let response = null;

    const contentType = req.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json"))
      response = await req.json();

    if (!acceptedStatuses.includes(req.status))
      return { ...response, success: false };

    return { success: true, data: response };
  } catch (error: any) {
    console.error(error);
    if (error.message === "Invalid session!") redirect("/api/auth/logout");
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
