"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState } from "react";

interface ImagePreviewProps {
  src: string;
}

export function ImagePreview({ src }: ImagePreviewProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-sm aspect-square">
      {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}

      <Image
        src={src}
        alt="Preview"
        fill
        className="rounded-lg object-cover"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}
