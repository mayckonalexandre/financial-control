"use client";

import { useState } from "react";
import { Modal } from "./default/modal";
import { useFormState } from "react-dom";
import { createRevenue } from "@/server.actions/revenues/create.revenue";
import { Toast } from "./default/toastify";
import { Title } from "./default/title";
import { ButtonCustom } from "./default/button";
import { X } from "lucide-react";
import { InputCustom } from "./default/input";
import SelectCustom from "./default/select";

export function CreateRevenue() {
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
    <>
      <ButtonCustom onClick={open} value="Adicionar Receita" />
      {openComponent && (
        <Modal>
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
                {error?.name?.toString()}
              </span>

              <SelectCustom
                placeholder="Categoria"
                label="Categorias"
                options={[{ id: 1, name: "Teste" }]}
                name="category_id"
              />

              <SelectCustom
                placeholder="Origem"
                label="Categorias"
                options={[{ id: 1, name: "Teste" }]}
                name="category_id"
              />

              <SelectCustom
                placeholder="Metodo"
                label="Categorias"
                options={[{ id: 1, name: "Teste" }]}
                name="category_id"
              />

              <span className="text-red-500 text-sm">
                {error?.name?.toString()}
              </span>

              <InputCustom
                placeholder=""
                type="text"
                className="border-gray-600 bg-gray-800 text-white"
              />
              <span className="text-red-500 text-sm">
                {error?.name?.toString()}
              </span>
              <ButtonCustom type="submit" value="Adicionar" className="" />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
