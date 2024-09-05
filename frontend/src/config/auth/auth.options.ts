import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { Authentication } from "@/serverActions/auth/authentication";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const data = await Authentication(
          credentials.email,
          credentials.password
        );

        if (!data.access_token) return null;

        return {
          access_token: data.access_token,
          id: "1",
          name: "teste",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.access_token) {
        session.access_token = token.access_token;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
