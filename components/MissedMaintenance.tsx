"use client";
import { MaintenanceItem, MissedMaintenanceData } from "";
import { useSidebar } from "./ui/sidebar";

export default function MissedMaintenance({
  data,
}: {
  data: MissedMaintenanceData[];
}) {
  const { state } = useSidebar();
  const noMissed = data
    ?.map((dataItem) => dataItem[3].length === 0)
    .every(Boolean);
  return (
    <div className="bg-white dark:bg-white/5 border-l-4 border-l-red-500 min-h-44 p-4 rounded-lg shadow-md flex flex-col gap-3 oveflow-auto lg:col-start-3 lg:col-end-5">
      <h1 className="font-semibold text-lg  md:text-xl tracking-widest text-slate-700 dark:text-[#e2e2e2]">
        Missed Maintenance
      </h1>
      <ul className="flex flex-col gap-1 p-1 flex-1 divide-y-2 divide-slate-200 dark:divide-slate-700 overflow-auto">
        {noMissed && (
          <p
            className={`w-full h-full flex justify-center items-center text-base md:text-2xl lg:text-3xl text-slate-400 ${
              state === "expanded"
                ? "text-lg md:text-lg lg:text-3xl"
                : "text-base md:text-2xl lg:text-3xl"
            } `}
          >
            No Missed Maintenance
          </p>
        )}
        {data?.map(([carId, brand, model, Maintenance]) =>
          Maintenance.map((MaintenanceItem: MaintenanceItem) => {
            const kilometrageNextMaintenance =
              MaintenanceItem?.historyLog?.at(-1)?.kilometrageNextMaintenance ??
              0;
            return (
              <li
                className="flex justify-between items-center  p-1 rounded-sm "
                key={carId + MaintenanceItem.name}
              >
                <span
                  className={`text-sm md:text-base text-slate-600 font-semibold dark:text-[#b4b2b2] ${
                    state === "expanded"
                      ? "md:text-xs lg:text-xl"
                      : "text-base md:text-2xl lg:text-xl"
                  }`}
                >
                  {MaintenanceItem.name} ({brand}&nbsp;{model})
                </span>
                <span
                  className={`text-xs md:text-sm font-semibold  text-slate-500 dark:text-[#b4b2b2] ${
                    state === "expanded"
                      ? "md:text-xs lg:text-xl"
                      : "text-base md:text-2xl lg:text-xl"
                  }`}
                >
                  {(
                    kilometrageNextMaintenance -
                    MaintenanceItem.currentKilometrage
                  ).toLocaleString("en-US")}{" "}
                  &nbsp; KM
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
