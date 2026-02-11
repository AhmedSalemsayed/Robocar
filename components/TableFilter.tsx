"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoFilter } from "react-icons/io5";
import { Button } from "./ui/button";
import { useState } from "react";
import { Table } from "@tanstack/react-table";
export default function TableFilter({
  table,
}: {
  table: Table<MaintenanceItem>;
}) {
  const [position, setPosition] = useState("bottom");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="dark:bg-[#1e1e1e] tracking-wider dark:hover:bg-[#2a2a2a]"
        >
          <IoFilter className="font-semibold" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 overflow-auto ">
        <DropdownMenuLabel className="tracking-wide ">
          Filter by...
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          className="overflow-auto max-h-72"
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem
            value=""
            onSelect={() => table.setGlobalFilter("")}
          >
            None
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Unknown"
            onSelect={() => table.setGlobalFilter("Unknown")}
          >
            Unknown
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="GoodStatus"
            onSelect={() => table.setGlobalFilter("GoodStatus")}
          >
            Good Status
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="UpcomingStatus"
            onSelect={() => table.setGlobalFilter("UpcomingStatus")}
          >
            Upcoming Status
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="BadStatus"
            onSelect={() => table.setGlobalFilter("BadStatus")}
          >
            Bad Status
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="EngineSystem"
            onSelect={() => table.setGlobalFilter("Engine System")}
          >
            Engine System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="AirConditioningSystem"
            onSelect={() => table.setGlobalFilter("Air Conditioning System")}
          >
            Air Conditioning System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="TransmissionSystem"
            onSelect={() => table.setGlobalFilter("Transmission System")}
          >
            Transmission System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="SuspensionSystem"
            onSelect={() => table.setGlobalFilter("Suspension System")}
          >
            Suspension System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="BrakingSystem"
            onSelect={() => table.setGlobalFilter("Braking System")}
          >
            Braking System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
