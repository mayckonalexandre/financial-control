import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { AuthContext } from "../config/context";
import React from "react";
import { LogOut, Plus } from "lucide-react-native";
import { logout } from "../actions/user";
import { router } from "expo-router";

export default function User() {
  const user = useContext(AuthContext);

  return (
    <View className="flex-row items-center justify-between w-full">
      <Text className="text-white text-xl font-bold">
        Olá {user ? user.name : ""}
      </Text>

      <View className="flex-row gap-2">
        <Pressable
          className="p-2"
          onPress={() => router.push("/create.transaction")}
        >
          <Text className="text-white font-bold text-center">
            <Plus color="#fff" size={25} />
          </Text>
        </Pressable>
        <Pressable className="p-2" onPress={logout}>
          <LogOut color="#fff" size={25} />
        </Pressable>
      </View>
    </View>
  );
}
