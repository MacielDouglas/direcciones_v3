"use server";

import { createAddress } from "@/lib/server/address";
import { addressSchema } from "./address.schema";

export async function createAddressAction(formData: unknown) {
  const parsed = addressSchema.safeParse(formData);

  if (!parsed.success) throw new Error("Dados inválidos");

  return createAddress(parsed.data);
}
