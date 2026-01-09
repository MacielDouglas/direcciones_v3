"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

export function ImageUpload() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch("/api/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      setImageUrl(data.url);

      const key = data.url.split("/").pop();
      setImageKey(key);
    }
  }

  async function handleDelete() {
    if (!imageKey) return;

    await fetch(`/api/image/delete?key=${imageKey}`, {
      method: "DELETE",
    });

    setImageUrl(null);
    setImageKey(null);
  }

  console.log(imageUrl);

  return (
    <div className="space-y-2 w-full flex items-center flex-col">
      <Label className="self-start">Foto del local</Label>
      <div className="border rounded-md w-full p-3 flex flex-col items-center gap-4">
        <h3 className="text-2xl font-semibold">¿Quieres enviar una foto?</h3>
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={400}
            height={400}
            alt="Preview"
            className="rounded-lg max-w-full object-cover"
          />
        ) : (
          // <>
          <>
            {!loaded && <Skeleton className="inset-0 rounded-b-md absolute" />}
            <Image
              src="https://pub-20ea17ad5d694dbc94202efa1ea340ff.r2.dev/da435e8d-39cf-48b6-b72a-e5c509520fdb.webp"
              width={400}
              height={400}
              alt="Preview"
              className="rounded-lg max-w-full object-cover"
              priority
              onLoad={() => setLoaded(true)}
            />
          </>
        )}
        {/* </> */}
        <p className="text-sm font-light p-2 bg-gray-100 dark:bg-stone-800 text-center rounded-sm">
          Puedes seleccionar una foto existente o tomar una nueva. Luego, haz
          clic en Subir imagen para completar el envío.
        </p>
        <Button>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleUpload}
            // className="cursor-pointer p-2 border rounded"
          />
        </Button>
        {loading && <p>Enviando...</p>}
        {imageUrl && (
          <div className="space-y-2">
            <Button
              type="button"
              onClick={handleDelete}
              className="text-sm text-red-600"
            >
              Remover imagem
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
