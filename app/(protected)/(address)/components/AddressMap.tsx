"use client";

import Map, { Marker, ViewState } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

type Coords = {
  latitude: number;
  longitude: number;
};

interface AddressMapProps {
  liveCoords?: Coords | null;
}

const FALLBACK: Coords = { latitude: -15.78, longitude: -47.93 };
const ZOOM = 16;

export default function AddressMap({ liveCoords }: AddressMapProps) {
  const { watch, setValue } = useFormContext();

  const formLat = watch("latitude");
  const formLng = watch("longitude");

  /**
   * 📍 Centro inicial do mapa
   */
  const center: Coords =
    formLat && formLng
      ? { latitude: formLat, longitude: formLng }
      : liveCoords ?? FALLBACK;

  /**
   * 🗺️ ViewState controlado (SEM useEffect)
   */
  const [viewState, setViewState] = useState<ViewState>({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: ZOOM,
    bearing: 0,
    pitch: 0,
    padding: {},
  });

  /**
   * 📌 Clique no mapa
   */
  const handleMapClick = (e: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = e.lngLat;

    setValue("latitude", lat, { shouldValidate: true });
    setValue("longitude", lng, { shouldValidate: true });

    setViewState((v) => ({
      ...v,
      latitude: lat,
      longitude: lng,
    }));
  };

  /**
   * 🧹 Limpar GPS do formulário
   */
  const handleClear = () => {
    setValue("latitude", undefined);
    setValue("longitude", undefined);
  };

  const handleUseMyLocation = () => {
    if (!liveCoords) return;

    // 1️⃣ Atualiza o formulário
    setValue("latitude", liveCoords.latitude, { shouldValidate: true });
    setValue("longitude", liveCoords.longitude, { shouldValidate: true });

    // 2️⃣ Move o mapa (CENTRALIZA)
    setViewState((prev) => ({
      ...prev,
      latitude: liveCoords.latitude,
      longitude: liveCoords.longitude,
      zoom: ZOOM,
    }));
  };

  return (
    <div className="space-y-3">
      {/* INPUTS GPS */}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={formLat ?? ""}
          onChange={(e) =>
            setValue("latitude", Number(e.target.value), {
              shouldValidate: true,
            })
          }
          className="border rounded p-2"
        />

        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={formLng ?? ""}
          onChange={(e) =>
            setValue("longitude", Number(e.target.value), {
              shouldValidate: true,
            })
          }
          className="border rounded p-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleUseMyLocation}
          disabled={!liveCoords}
        >
          Usar minha localização
        </Button>

        <Button type="button" size="sm" variant="outline" onClick={handleClear}>
          Limpar
        </Button>
      </div>

      {/* MAPA */}
      <div className="h-72 rounded overflow-hidden">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/standard"
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          onClick={handleMapClick}
        >
          {(formLat && formLng) || liveCoords ? (
            <Marker
              latitude={formLat ?? liveCoords!.latitude}
              longitude={formLng ?? liveCoords!.longitude}
            />
          ) : null}
        </Map>
      </div>
    </div>
  );
}
