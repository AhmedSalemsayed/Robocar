import AddNewCar from "@/components/AddNewCar";
import BarChart from "@/components/BarChart";
import MissedMaintenance from "@/components/MissedMaintenance";
import UpcomingMaintenance from "@/components/UpcomingMaintenance";

import { createClerkSupabaseClient } from "@/utils/supabase/server";
import * as motion from "motion/react-client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "RoboCar  | Home",
  description:
    "RoboCare is a maintenance management system for cars. It helps you keep track of your cars maintenance schedules and alerts you when maintenance is due.",
};

export default async function Home() {
  const supabase = await createClerkSupabaseClient();

  const { data: cars } = await supabase.from("cars").select("*");
  if (!cars || cars.length === 0)
    return (
      <div className="flex flex-col flex-1 gap-4 justify-center items-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl">
          Welcome To
          <span className="bg-[url(../public/needle-underline.png)] font-LuckiestGuy ml-2 bg-no-repeat bg-[0%_135%] md:bg-bottom ">
            RoboCar
          </span>
        </h1>
        <p className=" text-xl md:text-4xl ">Start By Adding Your cars</p>
        <AddNewCar />
      </div>
    );
  const UpcomingMaintenanceData: UpcomingMaintenanceData[] = cars?.map(
    (car: car) => [
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
    ]
  );

  const MissedMaintenanceData: MissedMaintenanceData[] = cars?.map(
    (car: car) => [
      car.carId,
      car.brand,
      car.model,
      car?.Maintenance.filter((item: MaintenanceItem) => {
        if (!item.historyLog.at(-1)) return false;
        const kilometrageNextMaintenance =
          item?.historyLog?.at(-1)?.kilometrageNextMaintenance ?? 0;

        return kilometrageNextMaintenance - item.currentKilometrage <= 0;
      }),
    ]
  );
  return (
    <section className="w-full p-4 md:pt-0  flex flex-col gap-1 flex-1 transition-all duration-500">
      <motion.div
        className="flex flex-col gap-0 mb-2 mt-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <h1 className="text-3xl font-semibold text-slate-700 dark:text-white ">
          Dashboard
        </h1>
        <p className="text-slate-400 text-sm md:text-base lg:text-lg">
          Here&apos;s Your Car Maintenance Overview
        </p>
      </motion.div>

      <motion.div
        className="grid gap-5 md:gap-2 grid-cols-1 md:grid-cols-2   lg:grid-cols-4 grid-rows-[auto_auto_1fr]  overflow-auto"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "interia" }}
      >
        <UpcomingMaintenance data={UpcomingMaintenanceData} />
        <MissedMaintenance data={MissedMaintenanceData} />
      </motion.div>
        <BarChart MaintenanceData={cars} />
    </section>
  );
}
