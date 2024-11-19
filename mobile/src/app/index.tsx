import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import dayjs from "dayjs";
import {
  getTransactions,
  Transactions,
} from "../actions/transactions/get.transactions";
import User from "../components/user";
import { Search, Trash2 } from "lucide-react-native";
import { deleteTransaction } from "../actions/transactions/delete.transactions";
import Wallet from "../components/wallet";
import { filter } from "../util/filter";

export default function Home() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transactions[] | null>(null);

  const get = async () => setTransactions(await getTransactions());

  useEffect(() => {
    get();
  }, []);

  const delTransactions = async (id: number, type: "revenue" | "expense") => {
    await deleteTransaction(id, type);
    await get();
  };

  return (
    <View className="flex flex-col gap-2 h-full w-full">
      <User />

      <Wallet transanctionsState={transactions} />

      <View className="flex-row items-center px-4 py-2 rounded-md border border-gray-600 bg-slate-800">
        <Search className="text-gray-400" size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-3 text-white placeholder-gray-400 focus:outline-none"
          placeholder="Pesquisar Transação"
          placeholderTextColor="#9CA3AF"
          onChangeText={(value) => setSearch(value)}
        />
      </View>

      <ScrollView className="flex-1">
        {transactions ? (
          transactions
            .filter((transaction) => filter(transaction, search))
            .map((transaction) => (
              <View
                key={transaction.id}
                className={`relative flex flex-col gap-1 p-2 mb-2 rounded-lg shadow-md bg-slate-800 ${
                  transaction.type === "revenue"
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-red-500"
                }`}
              >
                <Text className="text-slate-50 font-semibold text-lg">
                  {transaction.description}
                </Text>
                <Text
                  className={`text-xl font-semibold ${
                    transaction.type === "revenue"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  R$ {transaction.value.toFixed(2)}
                </Text>
                <Text className="text-white">
                  Categoria: {transaction.category}
                </Text>
                <Text className="text-white">Origem: {transaction.origin}</Text>
                <Text className="text-white">
                  Método de Pagamento: {transaction.payment_method}
                </Text>
                <Text className="text-white">
                  Data: {dayjs(transaction.date).format("DD/MM/YYYY")}
                </Text>
                <Pressable
                  onPress={() =>
                    delTransactions(transaction.id, transaction.type)
                  }
                  className="absolute top-3 right-3"
                >
                  <Trash2 color={"#F87171"} size={25} />
                </Pressable>
              </View>
            ))
        ) : (
          <Text className="text-slate-400 text-center">
            Nenhuma transação disponível.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
