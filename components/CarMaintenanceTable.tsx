"use client";

import { columns } from "./Columns";
import DataTable from "./DataTable";

export default function CarMaintenanceTable({
  maintainanceData,
}: {
  maintainanceData: MaintenanceItem[];
}) {
  return (
    <>
      <DataTable columns={columns} data={maintainanceData} />
    </>
  );
}
