"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

dayjs.locale(ptBR);

type DatePickerProps = {
  name?: string;
};

export function DatePicker(props: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex items-center justify-start text-left font-normal text-black",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            dayjs(date).format("DD/MM/YYYY")
          ) : (
            <span>Selecione a data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>

      <input
        type="hidden"
        name={props.name}
        value={date ? dayjs(date).format("YYYY-MM-DD") : ""}
      />
    </Popover>
  );
}
