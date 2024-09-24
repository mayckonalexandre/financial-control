import { authOptions } from "@/config/auth/auth.options";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <main>
      <h1>Admin Page</h1>
    </main>
  );
}
