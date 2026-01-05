// components/AddressMap.tsx
"use client";

import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useUserLocation } from "./hooks/useUserLocation";
import { Button } from "@/components/ui/button";

const FALLBACK = { latitude: -15.78, longitude: -47.93 };
const ZOOM = 16;

export default function AddressMap() {
  const { watch, setValue } = useFormContext();
  const formLat = watch("latitude");
  const formLng = watch("longitude");

  const {
    latitude: userLat,
    longitude: userLng,
    getUserLocation,
  } = useUserLocation(true);

  // 🗺️ mapa SEMPRE renderiza
  const [viewState, setViewState] = useState({
    latitude: FALLBACK.latitude,
    longitude: FALLBACK.longitude,
    zoom: ZOOM,
  });

  /**
   * 1️⃣ GPS inicial (automaticamente)
   */
  useEffect(() => {
    let raf: number | undefined;
    if (userLat && userLng) {
      raf = requestAnimationFrame(() => {
        setViewState((prev) => ({
          ...prev,
          latitude: userLat,
          longitude: userLng,
        }));

        setValue("latitude", userLat, { shouldValidate: true });
        setValue("longitude", userLng, { shouldValidate: true });
      });
    }

    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
    };
  }, [userLat, userLng, setValue]);

  /**
   * 2️⃣ Usuário colou coordenadas manualmente
   */
  useEffect(() => {
    let raf: number | undefined;
    if (formLat && formLng) {
      raf = requestAnimationFrame(() => {
        setViewState((prev) => ({
          ...prev,
          latitude: formLat,
          longitude: formLng,
        }));
      });
    }

    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
    };
  }, [formLat, formLng]);

  /**
   * 3️⃣ Clique no mapa
   */
  const handleClick = (e: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = e.lngLat;

    setValue("latitude", lat, { shouldValidate: true });
    setValue("longitude", lng, { shouldValidate: true });

    setViewState((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  return (
    <div className="space-y-3">
      {/* INPUTS PARA COLAR GPS */}
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

      {/* BOTÃO GPS */}
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={getUserLocation}
        >
          Usar minha localização
        </Button>
      </div>

      {/* MAPA LIVRE */}
      <div className="h-72 rounded overflow-hidden">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/standard"
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          onClick={handleClick}
        >
          {formLat && formLng && (
            <Marker latitude={formLat} longitude={formLng} />
          )}
        </Map>
      </div>
    </div>
  );
}
