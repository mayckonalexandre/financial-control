import { getWallet } from "@/server.actions/wallet/get.wallet";
import { WalletCard } from "./wallet.card";

export default async function Wallet() {
  const wallet = await getWallet();

  return (
    <section className="flex items-center gap-2.5">
      {wallet && <WalletCard balance={wallet.value} />}
    </section>
  );
}
