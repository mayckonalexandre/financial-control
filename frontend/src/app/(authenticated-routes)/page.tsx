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
import dayjs from "dayjs";
import { Suspense } from "react";
import Loading from "@/components/default/loading";

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
    <main className="flex flex-col gap-4">
      <Suspense fallback={<Loading />}>
        <div className="absolute top-5 right-5 flex gap-2.5 items-center justify-center">
          {origin && category && payment_method && (
            <CreateRevenue
              category={category}
              origin={origin}
              payment_method={payment_method}
            />
          )}
          <SignOutComponent />
        </div>

        <Wallet />

        <Title message="Receitas" />

        {transactions ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Descrição</th>
                  <th className="px-4 py-2 text-left">Origem</th>
                  <th className="px-4 py-2 text-left">Categoria</th>
                  <th className="px-4 py-2 text-center">Método</th>
                  <th className="px-4 py-2 text-center">Data</th>
                  <th className="px-4 py-2 text-center">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-200 "
                  >
                    <td className="px-4 py-3">{transaction.id}</td>
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td className="px-4 py-3">{transaction.origin}</td>
                    <td className="px-4 py-3">{transaction.category}</td>
                    <td className="px-4 py-3 text-center">
                      {transaction.payment_method}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {dayjs(transaction.date).format("DD/MM/YYYY")}
                    </td>
                    <td
                      className={`px-4 py-3 text-right ${
                        transaction.type === "revenue"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {formatValueInReal(transaction.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-red-500">
            Nenhuma receita encontrada.
          </p>
        )}
      </Suspense>
    </main>
  );
}
