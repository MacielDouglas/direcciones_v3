import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { r2 } from "@/lib/r2";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não enviado" },
        { status: 400 }
      );
    }

    // 1️⃣ Validação de tamanho (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Imagem deve ter no máximo 2MB" },
        { status: 400 }
      );
    }

    // 2️⃣ Converter File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3️⃣ Converter para WebP
    const webpBuffer = await sharp(buffer)
      .rotate() // corrige orientação do mobile
      .webp({ quality: 80 })
      .toBuffer();

    // 4️⃣ Gerar nome único
    const filename = `${crypto.randomUUID()}.webp`;

    // 5️⃣ Upload para o R2
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: filename,
        Body: webpBuffer,
        ContentType: "image/webp",
      })
    );

    const url = `${process.env.R2_PUBLIC_URL}/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no upload" }, { status: 500 });
  }
}
