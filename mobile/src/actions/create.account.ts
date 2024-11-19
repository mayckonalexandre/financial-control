import { Alert } from "react-native";
import { api } from "../config/api";
import { fetchCustom } from "./fetch";
import { router } from "expo-router";

type CreateAccount = {
  name: string;
  email: string;
  password: string;
};

export async function createAccount(data: CreateAccount) {
  const req = await fetchCustom({
    url: `${api.baseUrl}/user`,
    method: "POST",
    isAuthenticated: false,
    header: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  if (!req.success) {
    Alert.alert("Error", req.message);
    return
  }

  router.push("/login");
}
