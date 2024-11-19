import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../config/api";

export async function authentication(email: string, password: string) {
  try {
    const response = await fetch(`${api.baseUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-cache",
    });

    if (response.status != 200)
      return { success: false, message: response.statusText };

    const {
      access_token,
      name,
      id,
    }: { access_token: string; name: string; id: string } =
      await response.json();

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        access_token,
        name,
        id,
      })
    );

    return { access_token, name, id };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
