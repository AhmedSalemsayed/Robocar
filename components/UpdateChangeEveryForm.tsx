"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { useParams } from "next/navigation";
import { updateChangeEvery } from "@/lib/serverUtils";
import { toast } from "sonner";
import { Gauge, ArrowRight, Info } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

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

  const newValue = form.watch("changeEvery");
  const hasChanged = newValue !== rowData.changeEvery;

  const onSubmit = async (data: { changeEvery: number }) => {
    try {
      await updateChangeEvery(rowData.name, carId, data.changeEvery);
      toast.success(
        `Successfully updated ${rowData.name} change interval to ${data.changeEvery.toLocaleString()} km`,
        {
          duration: 4000,
          closeButton: true,
        }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-4 pb-4"
      >
        {/* Current Value Display */}
        <Card className="p-4 bg-slate-50 dark:bg-slate-900/50 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Current Interval
              </p>
              <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                {rowData.changeEvery.toLocaleString()} km
              </p>
            </div>
          </div>
        </Card>

        <Separator className="my-4" />

        {/* Input Field */}
        <FormField
          name="changeEvery"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                New Change Interval
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter new interval in kilometers"
                    className="text-base h-12 pr-12 text-slate-700 dark:text-slate-200"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
                    km
                  </span>
                </div>
              </FormControl>
              <FormDescription className="text-xs sm:text-sm flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                <span>
                  This determines how often maintenance should be performed for{" "}
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {rowData.name}
                  </span>
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Change Preview */}
        {hasChanged && newValue > 0 && (
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Current
                </p>
                <p className="text-base sm:text-lg font-bold text-slate-600 dark:text-slate-300">
                  {rowData.changeEvery.toLocaleString()} km
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <div className="flex-1 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  New
                </p>
                <p className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
                  {newValue.toLocaleString()} km
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <SubmitButton isSubmitting={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
}
