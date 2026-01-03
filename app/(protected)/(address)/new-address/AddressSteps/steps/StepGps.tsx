"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { AddressFormData } from "../../address.schema";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapMouseEvent } from "mapbox-gl";
import MapProvider from "../../../(map)/lib/mapbox/provider";
import MapStyles from "../../../(map)/components/map/map-styles";

const DEFAULT_LOCATION = {
  latitude: -23.55052,
  longitude: -46.633308,
};

type Coords = { latitude: number; longitude: number };

export function StepGps({ form }: { form: UseFormReturn<AddressFormData> }) {
  const latitude = useWatch({ control: form.control, name: "latitude" });
  const longitude = useWatch({ control: form.control, name: "longitude" });

  /** 📍 Localização real do usuário */
  const [userLocation, setUserLocation] = useState<Coords | null>(null);

  /** 🎯 Localização selecionada */
  const [selectedLocation, setSelectedLocation] = useState<Coords | null>(
    latitude && longitude ? { latitude, longitude } : null
  );

  const [viewState, setViewState] = useState({
    latitude: latitude ?? DEFAULT_LOCATION.latitude,
    longitude: longitude ?? DEFAULT_LOCATION.longitude,
    zoom: 15,
  });

  /**
   * Sincroniza selectedLocation -> form
   */
  useEffect(() => {
    if (!selectedLocation) return;

    form.setValue("latitude", selectedLocation.latitude, {
      shouldValidate: true,
    });
    form.setValue("longitude", selectedLocation.longitude, {
      shouldValidate: true,
    });
  }, [selectedLocation, form]);

  /**
   * Centraliza mapa quando seleção muda
   */
  useEffect(() => {
    if (!selectedLocation) return;

    setViewState((prev) => ({
      ...prev,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    }));
  }, [selectedLocation]);

  /**
   * GPS do dispositivo
   */
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordsData = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setUserLocation(coordsData);
        setSelectedLocation(coordsData); // inicializa seleção
      },
      () => alert("Permissão de localização negada"),
      { enableHighAccuracy: true }
    );
  };

  /**
   * Clique no mapa = mover pin de seleção
   */
  const handleMapClick = (e: MapMouseEvent) => {
    setSelectedLocation({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
  };

  /**
   * Colar coordenadas
   */
  const handlePasteCoords = (value: string) => {
    const [lat, lng] = value.split(",").map((v) => Number(v.trim()));

    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      setSelectedLocation({ latitude: lat, longitude: lng });
    } else {
      alert("Coordenadas inválidas");
    }
  };

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Localização</h3>

      <Button type="button" onClick={getCurrentLocation} className="w-full">
        Usar minha localização
      </Button>

      {/* COLAR COORDENADAS */}
      <FormItem>
        <FormLabel>Colar coordenadas GPS</FormLabel>
        <FormControl>
          <Input
            placeholder="-23.55052, -46.633308"
            onBlur={(e) => handlePasteCoords(e.target.value)}
          />
        </FormControl>
      </FormItem>

      {/* INPUTS */}
      <div className="grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input readOnly value={field.value ?? ""} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input readOnly value={field.value ?? ""} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* MAPA */}
      <div className="h-72 overflow-hidden rounded-lg">
        <div
          id="map-container"
          ref={mapContainerRef}
          className="absolute inset-0 h-full w-full"
        />
        <MapProvider
          mapContainerRef={mapContainerRef}
          initialViewState={{
            longitude: -35.00829,
            latitude: -8.50812,
            zoom: 10,
          }}
        >
          <MapStyles />
        </MapProvider>
      </div>

      <p className="text-xs text-muted-foreground">
        🔵 sua localização • 🔴 endereço selecionado
      </p>
    </div>
  );
}
