import { any, z } from "zod";

export const newCarSchema = z.object({
  chassisNumber: z
    .string()
    .min(6, { message: "Must Be at least 6 character long" }),
  brand: z.string().min(1, { message: "Must Be at least 1 character long" }),
  model: z.string().min(1, { message: "Must Be at least 1 character long" }),
  year: z
    .string()
    .min(4, { message: "Must Be at least 4 character long" })
    .max(4, { message: "Must Be at most 4 character long" }),
  color: z.string().min(1, { message: "Must Be at least 1 character long" }),
  currentKilometrage: z
    .string()
    .regex(/^\d+$/, { message: "Must be a Number" }),
  Maintenance: any(),
  carImage: any(),
});

export const AddNewMaintenanceSchema = z.object({
  date: z.any(),
  brand: z.string().min(1, { message: "Must Be at least 1 character long" }),
  price: z.string().min(1, { message: "Must Be at least 1 character long" }),
  kilometrageBeforeMaintenance: z.number().int().positive(),
  kilometrageNextMaintenance: z.number().int().positive(),
});
