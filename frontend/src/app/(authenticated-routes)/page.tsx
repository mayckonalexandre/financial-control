import { SignOutComponent } from "@/components/sign.out";
import { getRevenues } from "@/server.actions/revenues/get.revenues";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: { id: string };
}) {
  const id = searchParams?.id ?? undefined;

  const revenues = await getRevenues(id);

  return (
    <main>
      <h1>{JSON.stringify(revenues)}</h1>
      <Link href={"/?id=teste"}>teste</Link>
      <SignOutComponent />
    </main>
  );
}
