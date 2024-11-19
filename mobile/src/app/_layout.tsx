import "../global.css";
import React, { useContext, useEffect, useState } from "react";
import { router, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthProvider, { AuthContext } from "../config/context";

export default function Layout() {
  const user = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated)
      router.push("/login");
    setIsAuthenticated(user ? true : false);
  }, [isAuthenticated]);

  if (isAuthenticated === null)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <AuthProvider>
      <SafeAreaView className="flex-1 bg-slate-950">
        <View className="px-4 py-2 bg-slate-950 text-white min-h-screen">
          <Slot />
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}
