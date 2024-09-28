"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ISelectProps {
  void?: (value: string) => void;
  value?: string;
  options: { [key: string | number]: string | number }[];
  placeholder: string;
  label: string;
  name?: string;
}

export default function SelectCustom(props: ISelectProps) {
  const formatOptions = props.options.map((option) => {
    const keys = Object.keys(option);
    return { name: option[keys[1]] };
  });

  return (
    <Select onValueChange={props.void} name={props.name}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.label}</SelectLabel>
          {formatOptions.map((value) => (
            <SelectItem
              key={value.name}
              className="cursor-pointer"
              value={value.name as string}
            >
              {value.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
