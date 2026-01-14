"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
// import { useState, useMemo, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { AddressPhoto } from "@/app/(protected)/(address)/new-address/address.constants";
import { useFormContext, useWatch } from "react-hook-form";
import { AddressFormData } from "@/app/(protected)/(address)/new-address/address.schema";

type AddressPhotoType = (typeof AddressPhoto)[number]["type"];

const AddressPhotoMap: Record<AddressPhotoType, string> = Object.fromEntries(
  AddressPhoto.map(({ type, url }) => [type, url])
) as Record<AddressPhotoType, string>;

type UserImageValue = { imageUrl: string | null; imageKey: string | null };

interface ImageUploadProps {
  userImage: UserImageValue;
  onChangeUserImage: (value: UserImageValue) => void;
}

// export function ImageUpload({ value, onChange }: ImageUploadProps) {
export function ImageUpload({
  userImage,
  onChangeUserImage,
}: ImageUploadProps) {
  const { control } = useFormContext<AddressFormData>();
  const type = useWatch({ control, name: "type" });

  const [uploading, setUploading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  /** Foto default baseada no tipo */
  const defaultPhoto = AddressPhotoMap[type];

  const previewUrl = useMemo(() => {
    return userImage?.imageUrl ?? defaultPhoto;
  }, [userImage?.imageUrl, defaultPhoto]);

  const hasUserImage = Boolean(userImage?.imageUrl);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setImageLoaded(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data?.url) {
        onChangeUserImage({
          imageUrl: data.url,
          imageKey: data.key ?? data.url.split("/").pop() ?? null,
        });
      }
    } finally {
      setUploading(false);
      // permitir re-upload do mesmo arquivo
      e.target.value = "";
    }
  }

  async function handleDelete() {
    if (userImage?.imageKey) {
      await fetch(
        `/api/image/delete?key=${encodeURIComponent(userImage.imageKey)}`,
        {
          method: "DELETE",
        }
      );
    }

    // Limpa só a imagem do usuário => preview volta pra default automaticamente
    onChangeUserImage({ imageUrl: null, imageKey: null });
  }

  return (
    <div className="w-full space-y-2 flex flex-col items-center">
      <Label className="self-start">Foto do local</Label>

      <div className="w-full border rounded-md p-3 flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-center">
          Quer enviar uma foto?
        </h3>

        <div className="relative w-full max-w-sm aspect-square">
          {!imageLoaded && <Skeleton className="absolute inset-0 rounded-lg" />}

          <Image
            src={previewUrl}
            alt="Preview"
            fill
            priority
            className="rounded-lg object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>

        <p className="text-sm text-center p-2 rounded-sm bg-gray-100 dark:bg-stone-800">
          Você pode escolher uma foto existente ou tirar uma nova com a câmera.
        </p>

        <Button asChild className="w-full">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleUpload}
              className="hidden"
            />
            {uploading ? "Enviando..." : "Enviar imagem"}
          </label>
        </Button>

        {hasUserImage && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="w-full"
          >
            Remover imagem
          </Button>
        )}
      </div>
    </div>
  );
}
