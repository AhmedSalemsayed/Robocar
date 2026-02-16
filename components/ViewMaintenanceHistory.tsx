"use client";

import { format } from "date-fns";
import { Calendar, DollarSign, Gauge, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ViewMaintenanceHistory({
  rowData,
}: {
  rowData: rowData;
}) {
  const { historyLog, name } = rowData;

  if (!historyLog || historyLog.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <Calendar className="w-10 h-10 text-slate-400 dark:text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
          No History Available
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs">
          No maintenance records found for {name}. Start by adding your first
          maintenance entry.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[400px] px-4 overflow-y-auto">
      <div className="space-y-4 pb-4">
        {historyLog.map((log, index) => (
          <Card
            key={index}
            className="p-4 border-l-4 border-l-purple-500 dark:border-l-purple-400 dark:bg-slate-950 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3 ">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-700 dark:text-purple-400">
                    {historyLog.length - index}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Service Date
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(log.date), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              {log.price && (
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cost
                  </p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    {log.price}
                  </p>
                </div>
              )}
            </div>

            <Separator className="my-3" />

            <div className="space-y-2">
              {log.brand && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Brand
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {log.brand}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5" />
                  Kilometrage
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {log.kilometrageBeforeMaintenance.toLocaleString()} km
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {log.kilometrageNextMaintenance.toLocaleString()} km
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Change Interval:{" "}
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {(
                      log.kilometrageNextMaintenance -
                      log.kilometrageBeforeMaintenance
                    ).toLocaleString()}{" "}
                    km
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {historyLog.length > 0 && (
        <div className="text-center py-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Total Records: {historyLog.length}
          </p>
        </div>
      )}
    </div>
  );
}
