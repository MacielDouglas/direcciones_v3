"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { AddressFormData } from "../new-address/address.schema";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPinCheckInside, MapPinPlus, Trash2 } from "lucide-react";

import Map, {
  Marker,
  GeolocateControl,
  type MapRef,
  type MapMouseEvent,
  type GeolocateResultEvent,
  type GeolocateControlInstance,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type Coords = {
  latitude: number;
  longitude: number;
};

interface AddressGpsInputProps {
  liveCoords?: Coords | null;
}

const FALLBACK_COORDS: Coords = {
  latitude: -23.56139506222378,
  longitude: -46.65651535899276,
};

const ZOOM = 16;

function isValidCoords(lat?: unknown, lng?: unknown): lat is number {
  const la = Number(lat);
  const lo = Number(lng);

  return (
    Number.isFinite(la) &&
    Number.isFinite(lo) &&
    la >= -90 &&
    la <= 90 &&
    lo >= -180 &&
    lo <= 180
  );
}

export default function AddressGpsInput({ liveCoords }: AddressGpsInputProps) {
  const { control, watch, setValue } = useFormContext<AddressFormData>();

  const mapRef = useRef<MapRef | null>(null);
  const geolocateRef = useRef<GeolocateControlInstance | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isFetchingGps, setIsFetchingGps] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  const formLat = watch("latitude");
  const formLng = watch("longitude");

  const hasFormCoords = isValidCoords(formLat, formLng);

  const center: Coords = useMemo(() => {
    if (hasFormCoords)
      return { latitude: Number(formLat), longitude: Number(formLng) };
    return liveCoords ?? FALLBACK_COORDS;
  }, [hasFormCoords, formLat, formLng, liveCoords]);

  const flyTo = useCallback((coords: Coords) => {
    mapRef.current?.flyTo({
      center: [coords.longitude, coords.latitude],
      zoom: ZOOM,
      duration: 800,
      essential: true,
    });
  }, []);

  const setFormCoords = useCallback(
    ({ latitude, longitude }: Coords) => {
      setValue("latitude", latitude, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue("longitude", longitude, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  useEffect(() => {
    if (!liveCoords) return;
    setFormCoords(liveCoords);
    if (isMapReady) flyTo(liveCoords);
  }, [liveCoords, setFormCoords, flyTo, isMapReady]);

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      const { lat, lng } = event.lngLat;
      const coords: Coords = { latitude: lat, longitude: lng };

      setError(null);
      setFormCoords(coords);
      flyTo(coords);
    },
    [setFormCoords, flyTo]
  );

  const handleGeolocate = useCallback(
    (event: GeolocateResultEvent) => {
      const coords: Coords = {
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
      };

      setFormCoords(coords);
      flyTo(coords);

      setIsFetchingGps(false);
    },
    [setFormCoords, flyTo]
  );

  const handleUseMyLocation = useCallback(() => {
    if (!geolocateRef.current || isFetchingGps) return;

    setIsFetchingGps(true);
    setError(null);

    geolocateRef.current.trigger();
  }, [isFetchingGps]);

  const handlePaste = useCallback(async () => {
    try {
      setError(null);

      const text = await navigator.clipboard.readText();
      const [latRaw, lngRaw] = text.split(",").map((v) => v.trim());

      if (!latRaw || !lngRaw) {
        throw new Error("Formato inválido. Use: latitude, longitude");
      }

      const lat = Number(latRaw);
      const lng = Number(lngRaw);

      if (!isValidCoords(lat, lng)) {
        throw new Error("Coordenadas GPS inválidas");
      }

      const coords: Coords = { latitude: lat, longitude: lng };
      setFormCoords(coords);
      flyTo(coords);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao colar GPS");
    }
  }, [setFormCoords, flyTo]);

  const { resetField } = useFormContext<AddressFormData>();
  const handleClear = useCallback(() => {
    setError(null);
    resetField("latitude");
    resetField("longitude");

    flyTo(liveCoords ?? FALLBACK_COORDS);
  }, [flyTo, liveCoords, resetField]);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-72 relative overflow-hidden rounded-xl">
        {/* Skeleton cobre tudo até o mapa estar pronto, evitando "flash" visual. [web:33] */}
        {!isMapReady && (
          <Skeleton className="absolute inset-0 z-10 flex items-center justify-center">
            Carregando
          </Skeleton>
        )}

        <div
          className={isMapReady ? "w-full h-full" : "w-full h-full invisible"}
        >
          <Map
            ref={mapRef}
            initialViewState={{
              latitude: center.latitude,
              longitude: center.longitude,
              zoom: ZOOM,
            }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onLoad={() => setIsMapReady(true)}
            onClick={handleMapClick}
          >
            {/* Ponto azul (usuário) + círculo de precisão. [web:32] */}
            <GeolocateControl
              ref={geolocateRef}
              positionOptions={{ enableHighAccuracy: true }}
              showUserLocation
              showAccuracyCircle
              trackUserLocation={false}
              onGeolocate={handleGeolocate}
              onError={() => {
                setIsFetchingGps(false);
                setError("Não foi possível obter sua localização");
              }}
              style={{ display: "none" }}
            />

            {/* Pin do endereço (vermelho/normal) aparece quando o form tiver coords válidas */}
            {hasFormCoords && (
              <Marker
                latitude={Number(formLat)}
                longitude={Number(formLng)}
                anchor="bottom"
              />
            )}
          </Map>
        </div>
      </div>

      <div className="flex gap-4 flex-col">
        <div className="flex gap-4">
          <FormField
            control={control}
            name="latitude"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    inputMode="decimal"
                    className="text-blue-500 font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="longitude"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    inputMode="decimal"
                    className="text-blue-500 font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center flex-wrap justify-center gap-4">
          <Button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isFetchingGps}
          >
            <MapPinCheckInside size={18} />
            {isFetchingGps
              ? "Obtendo localização..."
              : "Usar minha localização"}
          </Button>

          <Button type="button" onClick={handlePaste}>
            <MapPinPlus size={18} /> Pegar GPS
          </Button>

          <Button type="button" onClick={handleClear} disabled={!hasFormCoords}>
            <Trash2 size={18} /> Limpar GPS
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
