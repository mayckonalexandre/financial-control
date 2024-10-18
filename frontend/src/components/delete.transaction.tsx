"use client";

import { X } from "lucide-react";
import { ButtonCustom } from "./default/button";
import { deleteRevenue } from "@/server.actions/revenues/delete.revenue";
import { Toast } from "./default/toastify";
import { deleteTransaction } from "@/server.actions/transaction/delete.transaction";

type DeleteTransactionProps = {
  type: "revenue" | "expense";
  id: number;
};

export function DeleteTransaction({ type, id }: DeleteTransactionProps) {
  const execute = async () => {
    let response;

    response = await deleteTransaction(id, type);

    response.success
      ? Toast({ type: "success", message: response.message })
      : Toast({ type: "warning", message: response.message });
  };

  return <ButtonCustom value={<X />} onClick={execute} />;
}
