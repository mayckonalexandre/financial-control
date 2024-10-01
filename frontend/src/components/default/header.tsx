import { User } from "next-auth";
import { Title } from "./title";

export default function Header({ user }: { user: User | null }) {
  return (
    <header className="flex flex-col gap-2.5 p-2.5">
      <Title message={`Olá ${user?.name}`} />
    </header>
  );
}
