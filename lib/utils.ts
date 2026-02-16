import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Filter maintenance items that are upcoming (within 1000km or less)
 */
export function filterUpcomingMaintenance(
  cars: car[]
): UpcomingMaintenanceData[] {
  return cars?.map((car: car) => [
    car.carId,
    car.brand,
    car.model,
    car?.Maintenance.filter((item: MaintenanceItem) => {
      const kilometrageNextMaintenance =
        item?.historyLog?.at(-1)?.kilometrageNextMaintenance ?? 0;
      return (
        kilometrageNextMaintenance - item.currentKilometrage <= 1000 &&
        kilometrageNextMaintenance - item.currentKilometrage > 0
      );
    }),
  ]);
}

/**
 * Filter maintenance items that are missed (past due)
 */
export function filterMissedMaintenance(
  cars: car[]
): MissedMaintenanceData[] {
  return cars?.map((car: car) => [
    car.carId,
    car.brand,
    car.model,
    car?.Maintenance.filter((item: MaintenanceItem) => {
      if (!item.historyLog.at(-1)) return false;
      const kilometrageNextMaintenance =
        item?.historyLog?.at(-1)?.kilometrageNextMaintenance ?? 0;
      return kilometrageNextMaintenance - item.currentKilometrage <= 0;
    }),
  ]);
}

/**
 * Prepare optimized chart data to minimize client serialization
 */
export function prepareChartData(cars: car[]) {
  return cars?.map((car) => ({
    brand: car.brand,
    model: car.model,
    maintenance: car.Maintenance.map((item) => ({
      name: item.name,
      currentKilometrage: item.currentKilometrage,
      changeEvery: item.changeEvery,
      lastHistoryLog: item.historyLog.at(-1) ?? null,
    })),
  }));
}
