"use client";
import {
  AddNewMaintenanceSchema,
} from "@/lib/zodSchemas";
import { useEffect, useState } from "react";
import { Form, FormField } from "./ui/form";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "./DatePicker";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { editLastMaintenance, getLatestMaintenance } from "@/lib/serverUtils";
import SkeletonForm from "./SkeletonForm";
import { toast } from "sonner";

interface EditLastMaintenanceProps {
  rowData: rowData;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditLastMaintenanceForm({
  rowData,
  setOpen,
}: EditLastMaintenanceProps) {
  const { carId }: { carId: string } = useParams();
  const [isLoading, setLoading] = useState(true);

  const form = useForm<AddNewMaintenance>({
    resolver: zodResolver(AddNewMaintenanceSchema),
  });
  const KmBeforeMaintenance = form.watch("kilometrageBeforeMaintenance");
  const KmAfterMaintenance = KmBeforeMaintenance + Number(rowData.changeEvery);
  // to populate the form fields with th last maintenance values
  useEffect(() => {
    async function loadData() {
      const data = await getLatestMaintenance(carId, rowData.name);
      form.reset({ date: data?.date, ...data });
      setLoading(false);
    }

    loadData();
  }, [form.reset, carId, rowData.name, form, rowData.currentKilometrage]);
  useEffect(() => {
    form.setValue("kilometrageNextMaintenance", KmAfterMaintenance);
  }, [KmAfterMaintenance, form]);

  if (isLoading) return <SkeletonForm />;
  if (!rowData.historyLog || rowData.historyLog.length === 0) {
    return (
      <div className="text-red-500 text-center">
        No Maintenance Data Available To Edit
      </div>
    );
  }
  async function onSubmit(values: AddNewMaintenance) {
    const newMaintenance = {
      ...values,
      date: values.date,
      name: rowData.name,
    };
    await editLastMaintenance(carId, newMaintenance);
    setOpen(false);
    toast.success(`${rowData.name} Maintenance Edited Successfully`, {
      duration: 4000,
      closeButton: true,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4 w-full `}
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => <DatePicker field={field} />}
        />
        <FormField
          control={form.control}
          name="kilometrageBeforeMaintenance"
          render={({ field }) => (
            <CustomFormField<AddNewMaintenance>
              field={field}
              label="Kilometrage Before Maintenance"
              placeholder="Enter Kilometrage Before Maintenance"
              type="number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="kilometrageNextMaintenance"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Kilometrage of  Next Maintenance"
              placeholder="Enter Kilometrage Before Maintenance"
              type="number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Brand"
              placeholder="Enter Brand"
            />
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <CustomFormField
              field={field}
              label="Price"
              placeholder="Enter Price"
            />
          )}
        />
        <SubmitButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
