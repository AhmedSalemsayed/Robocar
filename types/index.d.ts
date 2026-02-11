import { z } from "zod";
import { newCarSchema, AddNewMaintenanceSchema } from "@/lib/zodSchemas";
declare global {
  type NewCarType = z.infer<typeof newCarSchema>;
  type AddNewMaintenance = z.infer<typeof AddNewMaintenanceSchema>;
  type car = {
    carId: number;
    chassisNumber: string;
    brand: string;
    model: string;
    year: string;
    color: string;
    carImage: string;
    currentKilometrage: number;
    Maintenance: MaintenanceItem[];
  };

  type Log = {
    date: string;
    brand: string;
    price: string;
    kilometrageBeforeMaintenance: number;
    kilometrageNextMaintenance: number;
  };

  type MaintenanceItem = {
    name: string;
    class: string;
    changeEvery: number;
    currentKilometrage: number;
    historyLog: Log[];
  };

  type rowData = {
    name: string;
    class: string;
    changeEvery: number;
    currentKilometrage: number;
    historyLog: {
      date: string;
      brand: string;
      price: string;
      kilometrageBeforeMaintenance: number;
      kilometrageNextMaintenance: number;
    }[];
  };

  type UpcomingMaintenanceData = [
    carId: number,
    brand: string,
    model: string,
    Maintenance: MaintenanceItem[]
  ];
  type MissedMaintenanceData = [
    carId: number,
    brand: string,
    model: string,
    Maintenance: MaintenanceItem[]
  ];
}
export {};
