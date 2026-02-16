"use server";

import { s3 } from "@/lib/storage.config";
import { ActionResultType } from "@/lib/types/general.type";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadImagesAction(
  formData: FormData,
): Promise<ActionResultType<string[]>> {
  const files = formData.getAll("images") as File[];
  const directory = formData.get("directory") as string;
  debugger;

  if (!files.length) {
    return { success: false, errorMessage: "No images provided" };
  }

  const uploaded: string[] = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());

      const key = `uploads${directory ? "/" + directory : ""}/${Date.now()}-${file.name}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.LIARA_BUCKET_NAME!,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        }),
      );

      uploaded.push(`${process.env.CDN_URL}/${key}`);
    }
    return { success: true, data: uploaded };
  } catch (err) {
    debugger;
    return { success: false, errorMessage: "error" };

  }
}
