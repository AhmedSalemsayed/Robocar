"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Row } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableFilter from "./TableFilter";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

const customFilterFn = (
  row: Row<MaintenanceItem>,
  columnId: string,
  filterValue: string
) => {
  const kilometrageNextMaintenance =
    row.original.historyLog.at(-1)?.kilometrageNextMaintenance ?? 1;
  if (!filterValue) return false;
  if (filterValue === "Unknown") {
    return row.original.historyLog.length === 0;
  }
  if (filterValue === "GoodStatus") {
    return kilometrageNextMaintenance - row.original.currentKilometrage > 1000;
  }
  if (filterValue === "BadStatus") {
    return (
      kilometrageNextMaintenance - row.original.currentKilometrage < 0 &&
      row.original.historyLog.length !== 0
    );
  }
  if (filterValue === "UpcomingStatus") {
    return (
      kilometrageNextMaintenance - row.original.currentKilometrage > 0 &&
      kilometrageNextMaintenance - row.original.currentKilometrage <= 1000
    );
  }
  return row.original.class === filterValue;
};

export default function DataTable({
  columns,
  data,
}: DataTableProps<MaintenanceItem>) {
  const table = useReactTable<MaintenanceItem>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: customFilterFn,
  });
  return (
    <div className="flex flex-col gap-2 overflow-auto">
      <div className="flex justify-end items-center">
        <div>
          <span className="mr-5">{table.getState().globalFilter}</span>
          <TableFilter table={table} />
        </div>
      </div>
      <Table className="bg-white rounded-md p-4 overflow-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                return (
                  <TableHead
                    className={` bg-slate-100 dark:bg-[#1e1e1e] dark:text-[#b4b2b2] text-slate-700 font-semibold text-xs lg:text-sm text-center ${
                      i === 0
                        ? "sticky left-0 z-30 bg-slate-100 text-slate-700"
                        : ""
                    }`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className=" hover:shadow-md relative transition-all duration-300 ease-in-out"
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={cell.id}
                    className={`border-b border-slate-200 text-xs md:text-sm  dark:border-gray-500 duration-150 ease-linear dark:bg-[#2d2d2d] dark:text-[#b4b2b2] text-center  ${
                      i === 0
                        ? "sticky left-0 text-xs md:text-sm bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-[#1e1e1e] dark:text-[#b4b2b2]  "
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-72 text-center font-semibold text-lg md:h-[900px] lg:h-[363px]  dark:bg-[#2d2d2d] dark:text-[#b4b2b2]"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
