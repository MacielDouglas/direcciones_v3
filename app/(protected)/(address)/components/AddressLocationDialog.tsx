"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressMap from "./AddressMap";
import { useAddressLocation } from "./hooks/useAddressLocation";
import { useLiveUserLocation } from "./hooks/useLiveUserLocation";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function AddressLocationDialog() {
  const addressLocation = useAddressLocation();

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
          <DialogTitle>Localização do endereço</DialogTitle>
        </DialogHeader>

        <AddressMap liveCoords={liveCoords} />
      </DialogContent>
    </Dialog>
  );
}
