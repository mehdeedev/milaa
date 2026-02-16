"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export function Counter({
  value,
  setValue,
}: {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center bg-gray-100 rounded-md">
      <Button
        size={"icon-lg"}
        variant={"outline"}
        onClick={() => {
          setValue(value + 1);
        }}
      >
        <PlusIcon />
      </Button>
      <div className="w-12 flex items-center justify-center">{value}</div>
      <Button
        size={"icon-lg"}
        variant={"outline"}
        onClick={() => {
          if (value > 1) {
            setValue(value - 1);
          }
        }}
      >
        <MinusIcon />
      </Button>
    </div>
  );
}
