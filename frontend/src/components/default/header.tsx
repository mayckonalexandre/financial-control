import { User } from "next-auth";

export default function Header({ user }: { user: User | null }) {
  return (
    <header>
      <div>
        <h1>Olá {user?.name}</h1>
      </div>
    </header>
  );
}
