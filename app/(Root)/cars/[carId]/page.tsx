import CarInfo from "@/components/CarInfo";
import CarInfoLoadingSkeleton from "@/components/CarInfoLoadingSkeleton";
import CarMaintenanceTable from "@/components/CarMaintenanceTable";
import { createClerkSupabaseClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { Suspense } from "react";
type Props = {
  params: Promise<{ carId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;

  const supabase = await createClerkSupabaseClient();

  const { data } = await supabase.from("cars").select("*").eq("carId", carId);
  const car: car = data?.at(0);
  return {
    title: `RoboCar | ${car.brand} ${car.model}`,
    description: `RoboCare is a maintenance management system for cars. It helps you keep track of your car's maintenance schedules and alerts you when maintenance is due. View details for ${car.brand} ${car.model}.`,
  };
}

export default async function Page({ params }: Props) {
  const { carId } = await params;
  const supabase = await createClerkSupabaseClient();
  const { data } = await supabase.from("cars").select("*").eq("carId", carId);

  const car: car = data?.at(0);
  const maintainanceData = car?.Maintenance;
  return (
    <section className="flex flex-col flex-1 gap-2 p-1  md:pt-0 min-w-full max-h-dvh overflow-hidden ">
      <Suspense fallback={<CarInfoLoadingSkeleton />}>
        <CarInfo car={car} />
      </Suspense>
      <CarMaintenanceTable maintainanceData={maintainanceData} />
    </section>
  );
}
