import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export type User = {
  id: string;
  name: string;
  access_token: string;
};

export async function getUserData(): Promise<User | null> {
  const data = await AsyncStorage.getItem("user");
  if (!data) return null;
  return JSON.parse(data);
}

export async function logout() {
  await AsyncStorage.removeItem("user");
  router.push("/login");
}
