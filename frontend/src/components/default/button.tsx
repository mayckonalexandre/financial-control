"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type IButtonProps = {
  value: any;
  className?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};

export function ButtonCustom({
  className,
  value,
  type,
  onClick,
}: IButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={() => onClick && onClick()}
      type={type}
      disabled={pending}
      className={`transition-all duration-300 text-white py-2 rounded-lg font-semibold ${className}`}
    >
      {pending ? "Carregando..." : value}
    </Button>
  );
}
