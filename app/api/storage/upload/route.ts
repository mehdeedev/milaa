// src/app/api/storage/upload/route.ts or /app/api/storage/upload/route.ts

import { s3 } from "@/lib/storage.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const path = formData.get("path") as string;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  debugger

  const command = new PutObjectCommand({
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: path + file.name,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(command);

  return Response.json({ success: true, message: "File uploaded" });
}
