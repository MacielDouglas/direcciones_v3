"use client";

import mapboxgl, { MarkerOptions } from "mapbox-gl";
import { useMap } from "../../context/map-context";
import { useEffect, useRef, useCallback } from "react";
import { LocationFeature } from "../../lib/mapbox/utils";

type Props = {
  longitude: number;
  latitude: number;
  data: LocationFeature;
  onHover?: ({
    isHovered,
    position,
    marker,
    data,
  }: {
    isHovered: boolean;
    position: { longitude: number; latitude: number };
    marker: mapboxgl.Marker;
    data: LocationFeature;
  }) => void;

  onClick?: ({
    position,
    marker,
    data,
  }: {
    position: { longitude: number; latitude: number };
    marker: mapboxgl.Marker;
    data: LocationFeature;
  }) => void;
  children?: React.ReactNode;
} & MarkerOptions;

export default function Marker({
  children,
  latitude,
  longitude,
  data,
  onHover,
  onClick,
  ...props
}: Props) {
  const { map } = useMap();
  const markerRef = useRef<HTMLDivElement | null>(null);
  const markerInstance = useRef<mapboxgl.Marker | null>(null);

  const handleHover = useCallback(
    (isHovered: boolean) => {
      const inst = markerInstance.current;
      if (onHover && inst) {
        onHover({
          isHovered,
          position: { longitude, latitude },
          marker: inst,
          data,
        });
      }
    },
    [onHover, longitude, latitude, data]
  );

  const handleClick = useCallback(() => {
    const inst = markerInstance.current;
    if (onClick && inst) {
      onClick({
        position: { longitude, latitude },
        marker: inst,
        data,
      });
    }
  }, [onClick, longitude, latitude, data]);

  useEffect(() => {
    const markerEl = markerRef.current;
    if (!map || !markerEl) return;

    const handleMouseEnter = () => handleHover(true);
    const handleMouseLeave = () => handleHover(false);

    markerEl.addEventListener("mouseenter", handleMouseEnter);
    markerEl.addEventListener("mouseleave", handleMouseLeave);
    markerEl.addEventListener("click", handleClick);

    const options = {
      element: markerEl,
      ...props,
    };

    markerInstance.current = new mapboxgl.Marker(options)
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerInstance.current?.remove();
      if (markerEl) {
        markerEl.removeEventListener("mouseenter", handleMouseEnter);
        markerEl.removeEventListener("mouseleave", handleMouseLeave);
        markerEl.removeEventListener("click", handleClick);
      }
      markerInstance.current = null;
    };
  }, [map, longitude, latitude, props, handleHover, handleClick]);

  return (
    <div>
      <div ref={markerRef}>{children}</div>
    </div>
  );
}
