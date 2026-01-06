"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddressFormData, addressSchema } from "./address.schema";
import { startTransition } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AddressFormFields from "../components/AddressFormFields";
import AddressLocationDialog from "../components/AddressLocationDialog";
import { useLiveUserLocation } from "../components/hooks/useLiveUserLocation";

interface NewAddressProps {
  userId: string;
  organizationId: string;
}

export default function NewAddress({
  userId,
  organizationId,
}: NewAddressProps) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      type: "House",
      street: "",
      number: "",
      neighborhood: "",
      latitude: undefined,
      longitude: undefined,
      active: true,
      confirmed: false,
      createdUserId: userId,
      organizationId,
    },
  });

  useLiveUserLocation(true);

  const onSubmit = (data: AddressFormData) => {
    startTransition(() => {
      console.log("ENDEREÇO CADASTRADO:", data);
    });
  };

  // useUserLocation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AddressFormFields />

        {/* LOCALIZAÇÃO */}
        <AddressLocationDialog />

        <p>
          Valor GPS: {form.getValues(["longitude"])}{" "}
          {form.getValues(["latitude"])}
        </p>

        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>

          <Button type="submit">Confirmar e Enviar</Button>
        </div>
      </form>
    </Form>
  );
}
