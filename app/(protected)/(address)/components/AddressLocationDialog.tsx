"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddressLocation } from "./hooks/useAddressLocation";
import { useLiveUserLocation } from "./hooks/useLiveUserLocation";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import AddressGpsInput from "./AddressGpsInput";

export default function AddressLocationDialog() {
  const addressLocation = useAddressLocation();
  // navigator.geolocation.getCurrentPosition(({}) => {});

  // GPS só atualiza enquanto NÃO estiver travado
  const liveCoords = useLiveUserLocation(!addressLocation.locked);

  const handleOpen = () => {
    addressLocation.openDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Definir localização GPS</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Localização do endereço
          </DialogTitle>
          <DialogDescription asChild>
            <div className=" p-4 rounded-lg border bg-neutral-200 dark:bg-neutral-800">
              <h3 className="font-medium">Dica rápida</h3>
              <p className="text-sm mt-1 text-start">
                Puedes obtener coordenadas GPS con Google Maps. Solo mantén
                presionada la ubicación deseada en el mapa. Luego, usa el botón
                &quot;Pegar GPS&quot;.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <AddressGpsInput liveCoords={liveCoords} />
      </DialogContent>
    </Dialog>
  );
}
