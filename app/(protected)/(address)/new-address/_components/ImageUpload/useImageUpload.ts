"use client";

import { useState } from "react";
import { toast } from "sonner";

type UserImageValue = {
  imageUrl: string | null;
  imageKey: string | null;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const MIN_QUALITY = 0.4;

export function useImageUpload(onChange: (value: UserImageValue) => void) {
  const [uploading, setUploading] = useState(false);

  async function convertToWebP(file: File): Promise<File> {
    const bitmap = await createImageBitmap(file);

    const scale = Math.min(
      1,
      MAX_WIDTH / bitmap.width,
      MAX_HEIGHT / bitmap.height
    );

    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas não suportado");

    ctx.drawImage(bitmap, 0, 0, width, height);

    let quality = 0.9;
    let blob: Blob | null = null;

    while (quality >= MIN_QUALITY) {
      blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", quality)
      );

      if (blob && blob.size <= MAX_FILE_SIZE) break;
      quality -= 0.1;
    }

    if (!blob || blob.size > MAX_FILE_SIZE) {
      throw new Error("Não foi possível reduzir a imagem para menos de 2MB");
    }

    return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", {
      type: "image/webp",
    });
  }

  async function upload(file: File) {
    setUploading(true);

    try {
      const webpFile = await convertToWebP(file);

      const formData = new FormData();
      formData.append("file", webpFile);

      const res = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error);

      onChange({
        imageUrl: data.url,
        imageKey: data.key ?? null,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao enviar imagem"
      );
    } finally {
      setUploading(false);
    }
  }

  async function remove(imageKey?: string | null) {
    if (imageKey) {
      await fetch(`/api/image/delete?key=${encodeURIComponent(imageKey)}`, {
        method: "DELETE",
      });
    }

    onChange({ imageUrl: null, imageKey: null });
  }

  return {
    uploading,
    upload,
    remove,
  };
}
