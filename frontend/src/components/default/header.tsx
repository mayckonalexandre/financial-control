import { User } from "next-auth";
import { Title } from "./title";

export default function Header({ user }: { user: User | null }) {
  return (
    <header>
      <Title message={`Olá ${user?.name}`} />
    </header>
  );
}
