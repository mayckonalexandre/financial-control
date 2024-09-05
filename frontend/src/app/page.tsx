import { SignOutComponent } from "@/components/sign.out";
import { authOptions } from "@/config/auth/auth.options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <main>
      <h1>{JSON.stringify(session)}</h1>
      <SignOutComponent />
    </main>
  );
}
