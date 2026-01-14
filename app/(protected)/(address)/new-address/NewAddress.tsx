"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AddressFormData, addressSchema } from "./address.schema";
import { startTransition, useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AddressFormFields from "../components/AddressFormFields";
import AddressLocationDialog from "../components/AddressLocationDialog";
import { ImageUpload } from "@/components/Image/ImageUpload";
import { createAddressAction } from "./action";
import { toast } from "sonner";
import { AddressPhoto } from "./address.constants";

interface NewAddressProps {
  userId: string;
  organizationId: string;
}

export default function NewAddress({
  userId,
  organizationId,
}: NewAddressProps) {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const form = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      type: "House",
      street: "",
      number: "",
      neighborhood: "",
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      active: true,
      confirmed: false,
      image: {
        imageUrl: null,
        imageKey: null,
      },
      createdUserId: userId,
      organizationId,
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      form.setValue("latitude", coords.latitude, {
        shouldValidate: true,
      });

      form.setValue("longitude", coords.longitude, {
        shouldValidate: true,
      });
    });
  }, [form]);

  const defaultByType = Object.fromEntries(
    AddressPhoto.map((p) => [p.type, p.url])
  ) as Record<string, string>;

  const onSubmit = (data: AddressFormData) => {
    if (data.type === "House") {
      data = {
        ...data,
        businessName: "",
      };
    }

    const finalImageUrl = data.image.imageUrl ?? defaultByType[data.type];

    startTransition(async () => {
      try {
        await createAddressAction({
          ...data,
          image: {
            ...data.image,
            imageUrl: finalImageUrl,
          },
        });

        toast.success(
          `¡Direccion: ${data.street}, ${data.number} registrado exitosamente!`
        );
        form.reset();
      } catch (error) {
        toast.error("Erro ao cadastrar novo endereço!");
        console.error("Erro ao criar novo endereço!", error);
      }
    });
  };

  const missingFields = Object.entries(form.formState.errors).map(
    ([field, error]) => ({
      field,
      message: error?.message,
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AddressFormFields />

        {/* LOCALIZAÇÃO */}
        <div className="border rounded-xl  flex items-center flex-col gap-4 p-4">
          <AddressLocationDialog />
          {Number(form.getValues(["longitude"])) !== 0 ? (
            <p className="text-blue-500 font-semibold">
              GPS Lat: {form.getValues(["latitude"])}, Lon:
              {form.getValues(["longitude"])}
            </p>
          ) : (
            <p className="text-red-500 font-semibold">
              Não tem dados GPS. GPS obrigatório.
            </p>
          )}
        </div>

        <Controller
          name="image"
          control={form.control}
          render={({ field }) => (
            <ImageUpload
              // valor do usuário (pode ser null)
              userImage={field.value ?? { imageUrl: null, imageKey: null }}
              onChangeUserImage={field.onChange}
            />
          )}
        />

        {missingFields.length > 0 && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3">
            <p className="text-sm font-medium text-destructive mb-2">
              Campos obrigatórios pendentes:
            </p>

            <ul className="space-y-1 text-sm text-destructive">
              {missingFields.map(({ field, message }) => (
                <li key={field}>
                  • <strong>{field}</strong>
                  {message && ` — ${message}`}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>

          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Confirmar e Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}
