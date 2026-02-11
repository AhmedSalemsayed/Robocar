import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ControllerRenderProps } from "react-hook-form";


export default function DatePicker({
  field,
}: {
  field: ControllerRenderProps<AddNewMaintenance, "date">;
}) {
  return (
    <FormItem className="flex flex-col w-full px-4  lg:text-xs">
      <FormLabel>Date of Maintenance</FormLabel>
      <Popover modal={false}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                " pl-3 text-left font-normal w-full mt-1 ",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[60]" align="start">
          <Calendar
            className="z-[60] pointer-events-auto"
            mode="single"
            selected={field.value ? new Date(field.value) : undefined}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            footer={
              field.value
                ? `Selected: ${new Date(field.value).toLocaleDateString()}`
                : "Pick a day."
            }
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
