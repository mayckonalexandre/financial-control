import { Alert } from "react-native";
import { getUserData, logout } from "./user";

export type ResponseFetch = {
  success: boolean;
  message?: string;
  data?: any;
};

type FetchCustom = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  isAuthenticated: boolean;
  body?: object;
  header?: HeadersInit;
};

const successStatus = [200, 201];

export async function fetchCustom(data: FetchCustom): Promise<ResponseFetch> {
  let { url, method, header, body, isAuthenticated } = data;

  if (isAuthenticated) {
    const user = await getUserData();

    if (!user) return { success: false, message: "Sessão invalida!" };

    header = {
      ...(header || {}),
      Authorization: "Bearer " + user.access_token,
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
    });

    if (req.status === 401) await logout();

    let response = null;

    const contentType = req.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json"))
      response = await req.json();

    if (!successStatus.includes(req.status))
      return { ...response, success: false };

    return { success: true, data: response };
  } catch (error: any) {
    if (error.message === "Invalid session!") await logout();
    Alert.alert("Erro", error.message ?? "Internal Server Error");
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
