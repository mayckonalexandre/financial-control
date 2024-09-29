import { getWallet } from "@/server.actions/wallet/get.wallet";
import { formatValueInReal } from "@/util/formatting";

export default async function Wallet() {
  const wallet = await getWallet();

  return (
    <section className="flex items-center gap-2.5">
      <div className="flex gap-2.5 bg-blue-600 p-2.5 rounded-lg">
        <span>Saldo atual:</span>
        <span>{formatValueInReal(wallet.value)}</span>
      </div>
    </section>
  );
}
