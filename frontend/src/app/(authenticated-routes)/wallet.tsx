import { Title } from "@/components/default/title";
import { getWallet } from "@/server.actions/wallet/get.wallet";

export default async function Wallet() {
  const wallet = await getWallet();

  return (
    <div>
      <Title message="Carteira" />
      {wallet.value}
    </div>
  );
}
