"use client";

import { useEffect, useRef, useState } from "react";

interface Coords {
  latitude: number;
  longitude: number;
}

export function useLiveUserLocation(enabled: boolean, intervalMs = 5000) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const watchId = useRef<number | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled || !navigator.geolocation) return;

    // 🔥 mais rápido que getCurrentPosition
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      console.error,
      { enableHighAccuracy: true }
    );

    // fallback mobile (garante update)
    timer.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }, intervalMs);

    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
      if (timer.current) clearInterval(timer.current);
    };
  }, [enabled, intervalMs]);

  return coords;
}
