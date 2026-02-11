import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "./ui/form";
import DatePicker from "./DatePicker";
import CustomFormField from "./CustomFormField";
import { addNewMaintenance } from "@/lib/serverUtils";
import { useParams } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import { AddNewMaintenanceSchema } from "@/lib/zodSchemas";

interface AddNewMaintenanceProps {
  rowData: rowData;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddNewMaintenaceForm({
  rowData,
  setOpen,
}: AddNewMaintenanceProps) {
  const { carId }: { carId: string } = useParams();
  const form = useForm<AddNewMaintenance>({
    resolver: zodResolver(AddNewMaintenanceSchema),
    defaultValues: {
      date: new Date(),
      brand: "",
      price: "",
      kilometrageBeforeMaintenance: rowData.currentKilometrage,
      kilometrageNextMaintenance: 0,
    },
  });

  const KmBeforeMaintenance = form.watch("kilometrageBeforeMaintenance");
  const KmAfterMaintenance = KmBeforeMaintenance + Number(rowData.changeEvery);

  useEffect(() => {
    form.setValue("kilometrageNextMaintenance", KmAfterMaintenance);
  }, [KmAfterMaintenance, form]);

  async function onSubmit(values: AddNewMaintenance) {
    const newMaintenance = {
      ...values,
      date: values.date,
      name: rowData.name,
    };
    await addNewMaintenance({ newMaintenance, carId }).then(() => {
      setOpen(false);
      toast.success(`${rowData.name} Maintenance Added Successfully`, {
        duration: 4000,
        closeButton: true,
      });
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
