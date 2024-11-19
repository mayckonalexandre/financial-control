import { createContext, useEffect, useState } from "react";
import { getUserData, User } from "../actions/user";

export const AuthContext = createContext({} as User | null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => setUser(await getUserData());
    getUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
