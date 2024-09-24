import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputCustomProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  className?: string;
  register?: UseFormRegister<any>;
  setStateString?: React.Dispatch<React.SetStateAction<string>>;
  registerName?: string;
  defaultValue?: string;
  disabled?: boolean;
}

export function InputCustom({
  type,
  placeholder,
  className,
  register,
  registerName,
  defaultValue,
  disabled,
  setStateString,
}: InputCustomProps) {
  return (
    <input
      {...(register &&
        registerName &&
        register(registerName, { required: true }))}
      name={registerName}
      onChange={(event) => setStateString && setStateString(event.target.value)}
      placeholder={placeholder}
      className={`${
        className ?? ""
      } p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      type={type || "text"}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
}
