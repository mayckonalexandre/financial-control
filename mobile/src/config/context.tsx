import { createContext, useEffect, useState } from "react";
import { getUserData, User } from "../actions/user";
import { router } from "expo-router";

export const AuthContext = createContext({} as User | null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserData();

      if (!user) router.push("/login");
      
      setUser(user ?? null)
    };
    getUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
