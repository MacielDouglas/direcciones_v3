"use client";

import { Button } from "@/components/ui/button";

// import { Button } from "../ui/button";

interface Props {
  uploading: boolean;
  onSelect(file: File): void;
}

export function ImageUploadInput({ uploading, onSelect }: Props) {
  return (
    <Button asChild className="w-full">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onSelect(file);
            e.currentTarget.value = "";
          }}
        />
        {uploading ? "Enviando..." : "Enviar imagem"}
      </label>
    </Button>
  );
}
