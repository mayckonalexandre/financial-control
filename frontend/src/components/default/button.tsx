"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type IButtonProps = {
  value: any;
  className?: string;
  type?: "submit" | "button" | "reset";
};

export function ButtonCustom({ className, value, type }: IButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={type}
      disabled={pending}
      className={`transition-all duration-300 text-white py-2 rounded-lg font-semibold ${className}`}
    >
      {pending ? "Carregando..." : value}
    </Button>
  );
}
