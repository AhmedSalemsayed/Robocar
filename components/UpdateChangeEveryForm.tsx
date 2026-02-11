"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { useParams } from "next/navigation";
import { updateChangeEvery } from "@/lib/serverUtils";
import { toast } from "sonner";

interface UpdateChangeEveryFormProps {
  rowData: rowData;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateChangeEveryForm({
  rowData,
  setOpen,
}: UpdateChangeEveryFormProps) {
  const { carId }: { carId: string } = useParams();

  const form = useForm({
    defaultValues: {
      changeEvery: rowData.changeEvery || 0,
    },
  });
  const onSubmit = async (data: { changeEvery: number }) => {
    try {
      await updateChangeEvery(rowData.name, carId, data.changeEvery);
      toast.success(
        `Successfully updated ${rowData.name} Change Every value to ${data.changeEvery}`
      );
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="changeEvery"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter New Change Every value"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
