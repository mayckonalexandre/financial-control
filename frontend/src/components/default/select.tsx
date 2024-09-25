"use client"

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
  options: { id: string | number; name: string }[];
  placeholder: string;
  label: string;
  name?: string;
}

export default function SelectCustom(props: ISelectProps) {
  return (
    <Select value={props.value} onValueChange={props.void} name={props.name}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.label}</SelectLabel>
          {props.options.map((value) => (
            <SelectItem
              key={value.id}
              className="cursor-pointer"
              value={value.name}
            >
              {value.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
