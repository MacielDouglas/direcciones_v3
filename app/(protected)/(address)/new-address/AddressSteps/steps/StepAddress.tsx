// steps/StepAddress.tsx
import { UseFormReturn } from "react-hook-form";
import { AddressForm } from "../../AddressForm";
import { AddressFormData } from "../../address.schema";

export function StepAddress({
  form,
}: {
  form: UseFormReturn<AddressFormData>;
}) {
  return <AddressForm form={form} />;
}
