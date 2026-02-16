"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit, MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddNewMaintenaceForm from "./AddNewMaintenaceForm";
import EditLastMaintenaceForm from "./EditLastMaintenanceForm";
import RemoveLastMaintenance from "./RemoveLastMaintenance";
import UpdateChangeEveryForm from "./UpdateChangeEveryForm";
import ViewMaintenanceHistory from "./ViewMaintenanceHistory";

export function ActionsDropDown({ rowData }: { rowData: rowData }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<
    "add" | "edit" | "remove" | "viewHistory" | "changeEvery"
  >("add");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SlOptionsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative w-52 right-1">
          <DialogTrigger className="w-full">
            <DropdownMenuItem onClick={() => setMode("add")}>
              <IoMdAdd />
              Add New Maintenance
            </DropdownMenuItem>

            <DropdownMenuItem
              className="disabled:cursor-not-allowed"
              onClick={() => setMode("edit")}
            >
              <MdEdit />
              Edit Last Maintenance
            </DropdownMenuItem>
            <DropdownMenuItem
              className="disabled:cursor-not-allowed text-[13px]"
              onClick={() => setMode("remove")}
            >
              <MdDelete />
              Remove Last Maintenance
            </DropdownMenuItem>

            <DropdownMenuItem
              className="disabled:cursor-not-allowed"
              onClick={() => setMode("viewHistory")}
            >
              <FaHistory />
              View History
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMode("changeEvery")}>
              <AiFillEdit />
              Update Change Every
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* **************************** */}
      <DialogContent className="p-0 py-4 max-w-[350px] sm:max-w-lg rounded-lg">
        <DialogHeader className="px-4">
          <DialogTitle className="text-base sm:text-lg">
            {mode === "edit" && `Edit Last ${rowData.name} Maintenance`}
            {mode === "add" && `Add New ${rowData.name} Maintenance`}
            {mode === "remove" && `Remove Last ${rowData.name} Maintenance`}
            {mode === "changeEvery" &&
              `Update ${rowData.name} Change Every Value`}
            {mode === "viewHistory" &&
              `View ${rowData.name} Maintenance History`}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit" && "Modify Maintenance Data below."}
            {mode === "add" && "Enter the new Maintenance data."}
            {mode === "viewHistory" && "View the history of this maintenance."}
          </DialogDescription>
        </DialogHeader>

        {mode === "changeEvery" && (
          <UpdateChangeEveryForm rowData={rowData} setOpen={setOpen} />
        )}
        {mode === "edit" && (
          <EditLastMaintenaceForm rowData={rowData} setOpen={setOpen} />
        )}
        {mode === "add" && (
          <AddNewMaintenaceForm rowData={rowData} setOpen={setOpen} />
        )}
        {mode === "remove" && (
          <RemoveLastMaintenance rowData={rowData} setOpen={setOpen} />
        )}
        {mode === "viewHistory" && (
          <ViewMaintenanceHistory rowData={rowData} />
        )}
      </DialogContent>
    </Dialog>
  );
}
