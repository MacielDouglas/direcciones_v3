"use client";

import { useCallback, useEffect, useState } from "react";

export function useUserLocation(autoStart: boolean = false) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation não suportada");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao obter localização", error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (autoStart) {
      // call asynchronously to avoid calling setState synchronously inside the effect
      setTimeout(() => {
        getUserLocation();
      }, 0);
    }
  }, [autoStart, getUserLocation]);

  return {
    latitude,
    longitude,
    loading,
    getUserLocation, // ⬅️ ISSO PRECISA EXISTIR
  };
}
