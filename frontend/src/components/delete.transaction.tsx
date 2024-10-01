"use client";

import { X } from "lucide-react";
import { ButtonCustom } from "./default/button";
import { deleteRevenue } from "@/server.actions/revenues/delete.revenue";
import { Toast } from "./default/toastify";

type DeleteTransactionProps = {
  type: "revenue" | "expense";
  id: number;
};

export function DeleteTransaction({ type, id }: DeleteTransactionProps) {
  const execute = async () => {
    let response;

    response = await deleteRevenue(id);

    response.success
      ? Toast({ type: "success", message: response.message })
      : Toast({ type: "warning", message: response.message });
  };

  return <ButtonCustom value={<X />} onClick={execute} />;
}
