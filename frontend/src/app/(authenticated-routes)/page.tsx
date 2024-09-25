import { Title } from "@/components/default/title";
import { SignOutComponent } from "@/components/sign.out";
import { formatValueInReal } from "@/util/formatting";
import Wallet from "./wallet";
import { getTransactions } from "@/server.actions/transactions/get.transactions";
import { CreateRevenue } from "@/components/create.revenue";
import {
  getSources,
  getCategories,
  getPaymentMethods,
} from "@/server.actions/options";

export default async function Home({
  searchParams,
}: {
  searchParams?: { id: string };
}) {
  const id_revenue = searchParams?.id ?? undefined;

  const [transactions, origin, category, payment_method] = await Promise.all([
    await getTransactions(),
    await getSources(),
    await getCategories(),
    await getPaymentMethods(),
  ]);

  return (
    <main className="flex flex-col gap-2.5">
      {origin && category && payment_method && <CreateRevenue />}

      <Wallet />

      <Title message="Receitas" />

      {transactions ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Descrição</th>
                <th className="px-4 py-2 text-left">Categoria</th>
                <th className="px-4 py-2 text-left">Origem</th>
                <th className="px-4 py-2 text-left">Valor</th>
                <th className="px-4 py-2 text-left">Método</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 ">
                  <td className="px-4 py-3">{transaction.id}</td>
                  <td className="px-4 py-3">{transaction.description}</td>
                  <td className="px-4 py-3">{transaction.category}</td>
                  <td className="px-4 py-3">{transaction.origin}</td>
                  <td
                    className={`px-4 py-3 text-right ${
                      transaction.type === "revenue"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatValueInReal(transaction.value)}
                  </td>
                  <td className="px-4 py-3">{transaction.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">Nenhuma receita encontrada.</p>
      )}

      <SignOutComponent />
    </main>
  );
}
