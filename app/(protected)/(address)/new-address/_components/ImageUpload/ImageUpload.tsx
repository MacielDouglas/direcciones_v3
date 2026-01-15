"use client";

import { AddressPhoto } from "@/app/(protected)/(address)/new-address/address.constants";
import { ImagePreview } from "./ImagePreview";
import { ImageUploadInput } from "./ImageUploadInput";
import { useImageUpload } from "./useImageUpload";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type AddressPhotoType = (typeof AddressPhoto)[number]["type"];

const AddressPhotoMap = Object.fromEntries(
  AddressPhoto.map(({ type, url }) => [type, url])
) as Record<AddressPhotoType, string>;

type UserImageValue = {
  imageUrl: string | null;
  imageKey: string | null;
};

interface Props {
  userImage: UserImageValue;
  onChangeUserImage(value: UserImageValue): void;
  addressType: AddressPhotoType;
}

export function ImageUpload({
  userImage,
  onChangeUserImage,
  addressType,
}: Props) {
  const { uploading, upload, remove } = useImageUpload(onChangeUserImage);

  const previewUrl = userImage.imageUrl ?? AddressPhotoMap[addressType];

  return (
    <div className="w-full space-y-2 flex flex-col items-center">
      <Label className="self-start">Foto do local</Label>

      <div className="w-full border rounded-md p-3 flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-center">
          Quer enviar uma foto?
        </h3>

        <ImagePreview src={previewUrl} />

        <p className="text-sm text-center p-2 rounded-sm bg-gray-100 dark:bg-stone-800">
          Você pode escolher uma foto existente ou tirar uma nova com a câmera.
        </p>

        <ImageUploadInput uploading={uploading} onSelect={upload} />

        {userImage.imageUrl && (
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={() => remove(userImage.imageKey)}
          >
            Remover imagem
          </Button>
        )}
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Label } from "../ui/label";
// import { Skeleton } from "../ui/skeleton";
// import { AddressPhoto } from "@/app/(protected)/(address)/new-address/address.constants";
// import { toast } from "sonner";

// type AddressPhotoType = (typeof AddressPhoto)[number]["type"];

// const AddressPhotoMap: Record<AddressPhotoType, string> = Object.fromEntries(
//   AddressPhoto.map(({ type, url }) => [type, url])
// ) as Record<AddressPhotoType, string>;

// type UserImageValue = { imageUrl: string | null; imageKey: string | null };

// interface ImageUploadProps {
//   userImage: UserImageValue;
//   onChangeUserImage: (value: UserImageValue) => void;
//   addressType: AddressPhotoType;
// }

// export function ImageUpload({
//   userImage,
//   onChangeUserImage,
//   addressType,
// }: ImageUploadProps) {
//   const [uploading, setUploading] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const defaultPhoto = AddressPhotoMap[addressType];
//   const previewUrl = userImage?.imageUrl ?? defaultPhoto;

//   const hasUserImage = Boolean(userImage?.imageUrl);

//   const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
//   const MAX_WIDTH = 1920; // ótimo para mobile + desktop
//   const MAX_HEIGHT = 1920;
//   const MIN_QUALITY = 0.4; // abaixo disso não vale a pena

//   async function convertToWebP(file: File): Promise<File> {
//     const bitmap = await createImageBitmap(file);

//     // 2. Redimensiona mantendo proporção
//     const scale = Math.min(
//       1,
//       MAX_WIDTH / bitmap.width,
//       MAX_HEIGHT / bitmap.height
//     );

//     const width = Math.round(bitmap.width * scale);
//     const height = Math.round(bitmap.height * scale);

//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) throw new Error("Canvas não suportado");

//     ctx.drawImage(bitmap, 0, 0, width, height);

//     // 3. Re-encoda progressivamente até < 2MB
//     let quality = 0.9;
//     let blob: Blob | null = null;

//     while (quality >= MIN_QUALITY) {
//       blob = await new Promise<Blob | null>((resolve) =>
//         canvas.toBlob(resolve, "image/webp", quality)
//       );

//       if (blob && blob.size <= MAX_FILE_SIZE) break;

//       quality -= 0.1;
//     }

//     if (!blob) {
//       throw new Error("Falha ao converter imagem");
//     }

//     if (blob.size > MAX_FILE_SIZE) {
//       throw new Error("Não foi possível reduzir a imagem para menos de 2MB");
//     }

//     // 4. Retorna um File .webp
//     return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", {
//       type: "image/webp",
//     });
//   }

//   async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     setImageLoaded(false);

//     try {
//       const webpFile = await convertToWebP(file);

//       const formData = new FormData();
//       formData.append("file", webpFile);

//       const res = await fetch("/api/image/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.error || "Erro ao enviar imagem");
//       }

//       onChangeUserImage({
//         imageUrl: data.url,
//         imageKey: data.key ?? null,
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error instanceof Error ? error.message : "Falha ao processar imagem"
//       );
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   }

//   async function handleDelete() {
//     if (userImage?.imageKey) {
//       try {
//         await fetch(
//           `/api/image/delete?key=${encodeURIComponent(userImage.imageKey)}`,
//           {
//             method: "DELETE",
//           }
//         );
//       } catch {
//         toast.error("Erro ao remover imagem");
//       }
//     }

//     onChangeUserImage({ imageUrl: null, imageKey: null });
//   }

//   return (
//     <div className="w-full space-y-2 flex flex-col items-center">
//       <Label className="self-start">Foto do local</Label>

//       <div className="w-full border rounded-md p-3 flex flex-col items-center gap-4">
//         <h3 className="text-lg font-semibold text-center">
//           Quer enviar uma foto?
//         </h3>

//         <div className="relative w-full max-w-sm aspect-square">
//           {!imageLoaded && <Skeleton className="absolute inset-0 rounded-lg" />}

//           <Image
//             src={previewUrl}
//             alt="Preview"
//             fill
//             priority
//             className="rounded-lg object-cover"
//             onLoad={() => setImageLoaded(true)}
//             onError={() => setImageLoaded(true)}
//           />
//         </div>

//         <p className="text-sm text-center p-2 rounded-sm bg-gray-100 dark:bg-stone-800">
//           Você pode escolher uma foto existente ou tirar uma nova com a câmera.
//         </p>

//         <Button asChild className="w-full">
//           <label className="cursor-pointer">
//             <input
//               type="file"
//               accept="image/*"
//               capture="environment"
//               onChange={handleUpload}
//               className="hidden"
//             />
//             {uploading ? "Enviando..." : "Enviar imagem"}
//           </label>
//         </Button>

//         {hasUserImage && (
//           <Button
//             type="button"
//             variant="destructive"
//             onClick={handleDelete}
//             className="w-full"
//           >
//             Remover imagem
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }
