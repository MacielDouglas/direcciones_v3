"use client";

import { useTransition } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFormData } from "./address.schema";
import { ADDRESS_TYPES, ADDRESS_TYPE_LABEL } from "./address.constants";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createAddress } from "./address.actions";
import { FormSelect } from "../components/FormSelect";
import { FormInput } from "../components/FormInput";
import { FormTextarea } from "../components/FormTextarea";

export function AddressForm({
  form,
}: {
  form: UseFormReturn<AddressFormData>;
}) {
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: AddressFormData) {
    startTransition(async () => {
      await createAddress(values);
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormSelect
          control={form.control}
          name="type"
          label="Tipo"
          options={ADDRESS_TYPES.map((type) => ({
            value: type,
            label: ADDRESS_TYPE_LABEL[type],
          }))}
        />

        <FormInput
          control={form.control}
          name="businessName"
          label="Nome do endereço"
          placeholder="Ex: Casa da Maria"
        />

        <FormInput control={form.control} name="street" label="Rua" />

        <div className="grid grid-cols-2 gap-4">
          <FormInput control={form.control} name="number" label="Número" />

          <FormInput
            control={form.control}
            name="neighborhood"
            label="Bairro"
          />
        </div>

        <FormTextarea
          control={form.control}
          name="info"
          label="Informações adicionais"
        />

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full text-base"
        >
          {isPending ? "Salvando..." : "Salvar endereço"}
        </Button>
      </form>
    </Form>
  );
}
