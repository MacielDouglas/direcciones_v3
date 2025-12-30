import { z } from "zod";
import { ADDRESS_TYPES } from "./address.constants";

export const addressSchema = z.object({
  type: z.enum(ADDRESS_TYPES),
  businessName: z.string().min(2, "Nome muito curto").max(40),
  street: z.string().min(2),
  number: z.string().min(1),
  neighborhood: z.string().min(2),
  gps: z.string().optional(),
  info: z.string().max(120).optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
