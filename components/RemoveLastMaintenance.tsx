'use client";';
import { Button } from "./ui/button";
import { deleteLastMaintenance } from "@/lib/serverUtils";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";

interface RemoveLastMaintenanceProps {
  rowData: rowData;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RemoveLastMaintenance({
  rowData,
  setOpen,
}: RemoveLastMaintenanceProps) {
  const { carId }: { carId: string } = useParams();
  const [isDisabled, setIsDisabled] = useState(false);
  if (!rowData.historyLog || rowData.historyLog.length === 0) {
    return (
      <div className="text-red-500 text-center">
        No Maintenance Data Available To Delete
      </div>
    );
  }
  return (
    <>
      <h6 className="text-sm text-muted-foreground px-4">
        This action cannot be undone. This will permanently delete the last
        maintenance record and remove it from your history.
      </h6>
      <div className="flex justify-end gap-2 px-4">
        <Button
          className="bg-muted text-muted-foreground hover:bg-slate-200"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          disabled={isDisabled}
          onClick={async () => {
            try {
              setIsDisabled(true);
              await deleteLastMaintenance(rowData.name, carId);
              setOpen(false);
              setIsDisabled(false);
              toast.success(
                `Last ${rowData.name} Maintenance removed successfully`
              );
            } catch (error) {
              if (error instanceof Error) {
                setOpen(false);
                toast.error(error.message, {
                  closeButton: true,
                });
              }
            }
          }}
        >
          {isDisabled && <SpinnerMini />}
          Confirm
        </Button>
      </div>
    </>
  );
}
