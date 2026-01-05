// components/AddressLocationDialog.tsx
"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressMap from "./AddressMap";
import { useUserLocation } from "./hooks/useUserLocation";
// import { useUserLocation } from "@/hooks/useUserLocation";

export default function AddressLocationDialog() {
  const { setValue } = useFormContext();
  const { latitude, longitude, getUserLocation, loading } = useUserLocation();

  // sempre que o hook receber coords, sincroniza com o form
  useEffect(() => {
    if (latitude && longitude) {
      setValue("latitude", latitude, { shouldValidate: true });
      setValue("longitude", longitude, { shouldValidate: true });
    }
  }, [latitude, longitude, setValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          Definir localização GPS
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Localização do Endereço</DialogTitle>
        </DialogHeader>

        <Button onClick={getUserLocation} disabled={loading}>
          {loading ? "Obtendo localização..." : "Usar minha localização"}
        </Button>

        <AddressMap />
      </DialogContent>
    </Dialog>
  );
}
