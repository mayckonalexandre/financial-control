import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getWallet, WalletType } from "../actions/get.wallet";
import React from "react";
import { formatValueInReal } from "../util/formatting";
import { Banknote, EyeOff, Eye } from "lucide-react-native";
import { Transactions } from "../actions/transactions/get.transactions";

type WalletProps = {
  transanctionsState: Transactions[] | null;
};

export default function Wallet({ transanctionsState }: WalletProps) {
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [viewBalance, setViewBalance] = useState(false);

  const view = () => setViewBalance((state) => !state);

  useEffect(() => {
    const get = async () => setWallet(await getWallet());
    get();
  }, [transanctionsState]);

  return (
    <View className="flex-row items-center gap-4 p-2 bg-gray-800 rounded-lg shadow-lg text-white w-full">
      <Banknote color="#22c55e" size={24} />
      <View className="flex-1">
        <Text className="text-sm text-gray-400">Saldo atual:</Text>
        {wallet && (
          <Text className="text-xl text-white">
            {viewBalance ? formatValueInReal(wallet.value) : "***"}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={view}
        className="p-2 rounded-full hover:bg-gray-700"
      >
        {viewBalance ? (
          <EyeOff color="#a1a1aa" size={25} />
        ) : (
          <Eye color="#a1a1aa" size={25} />
        )}
      </TouchableOpacity>
    </View>
  );
}
