"use client";

import React, { useState } from "react";
import { Modal } from "./default/modal";
import { useFormState } from "react-dom";
import { createRevenue } from "@/server.actions/revenues/create.revenue";
import { Toast } from "./default/toastify";
import { Title } from "./default/title";
import { ButtonCustom } from "./default/button";
import { X } from "lucide-react";
import { InputCustom } from "./default/input";
import SelectCustom from "./default/select";
import { Category, Origin, PaymentMethod } from "@/server.actions/options";
import { DatePicker } from "./default/date.picker";

type CreateRevenueProps = {
  origin: Origin[];
  category: Category[];
  payment_method: PaymentMethod[];
};

export function CreateRevenue(props: CreateRevenueProps) {
  const { origin, category, payment_method } = props;

  const [state, formAction] = useFormState(createRevenue, {
    message: "",
    success: false,
    error: "",
  });

  const [openComponent, setOpenComponente] = useState(false);

  const open = () => setOpenComponente((state) => !state);

  const error = state.error ? JSON.parse(state.error) : null;

  if (state.message)
    state.success
      ? Toast({ message: state.message, type: "success" })
      : Toast({ message: state.message, type: "error" });

  return (
    <React.Fragment>
      <ButtonCustom
        onClick={open}
        value="Adicionar Receita"
        className="w-40 bg-blue-500 hover:bg-blue-600"
      />
      {openComponent && (
        <Modal className="justify-end">
          <div className="flex flex-col bg-gray-950 w-[500px] p-6 gap-4 rounded-lg shadow h-screen">
            <div className="flex items-center justify-between">
              <Title message="Adicionar Receita" />
              <X onClick={open} className="cursor-pointer" />
            </div>
            <form action={formAction} className="flex flex-col gap-4">
              <InputCustom
                placeholder="Descrição"
                type="text"
                registerName="description"
                className="border-gray-600 bg-gray-800 text-white"
              />

              <span className="text-red-500 text-sm">
                {error?.description?.toString()}
              </span>

              <InputCustom
                placeholder="Informe o valor"
                type="text"
                registerName="value"
                className="border-gray-600 bg-gray-800 text-white"
              />

              <span className="text-red-500 text-sm">
                {error?.value?.toString()}
              </span>

              <DatePicker name="date" />

              <span className="text-red-500 text-sm">
                {error?.date?.toString()}
              </span>

              <SelectCustom
                placeholder="Categoria"
                label="Categorias"
                options={category}
                name="category"
              />

              <span className="text-red-500 text-sm">
                {error?.category?.toString()}
              </span>

              <SelectCustom
                placeholder="Origem"
                label="Categorias"
                options={origin}
                name="origin"
              />

              <span className="text-red-500 text-sm">
                {error?.origin?.toString()}
              </span>

              <SelectCustom
                placeholder="Metodo"
                label="Categorias"
                options={payment_method}
                name="payment_method"
              />

              <span className="text-red-500 text-sm">
                {error?.payment_method?.toString()}
              </span>

              <ButtonCustom type="submit" value="Adicionar" className="" />
            </form>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}
