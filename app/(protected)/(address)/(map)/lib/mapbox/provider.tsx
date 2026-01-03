"use client";

import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { MapContext } from "../../context/map-context";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type MapComponentProps = {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  children?: ReactNode;
};

export default function MapProvider({
  mapContainerRef,
  initialViewState,
  children,
}: MapComponentProps) {
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    // store the instance in state so we don't read ref.current during render
    setMapInstance(map.current);

    map.current.on("load", () => {
      setLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        setMapInstance(null);
      }
    };
  }, [initialViewState, mapContainerRef]);

  return (
    <div className="z-50">
      <MapContext.Provider value={{ map: mapInstance! }}>
        {children}
      </MapContext.Provider>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
          <div className="text-lg font-medium">Loading map...</div>
        </div>
      )}
    </div>
  );
}
