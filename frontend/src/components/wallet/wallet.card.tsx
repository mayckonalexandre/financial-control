"use client";

import { formatValueInReal } from "@/util/formatting";
import { Banknote, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function WalletCard({ balance }: { balance: number }) {
  const [viewBalance, setViewBalance] = useState(true);

  const view = () => setViewBalance((state) => !state);

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-sm">
      <Banknote className="text-green-400" size={24} />
      <div className="flex flex-col flex-grow">
        <span className="text-sm text-gray-400">Saldo atual:</span>
        <span className="text-xl">
          {viewBalance ? formatValueInReal(balance) : "***"}
        </span>
      </div>
      <button
        onClick={view}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
      >
        {viewBalance ? (
          <EyeOff className="text-gray-400" size={20} />
        ) : (
          <Eye className="text-gray-400" size={20} />
        )}
      </button>
    </div>
  );
}
