import { auth } from "@/lib/auth";
import { s3 } from "@/lib/storage.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";

export async function POST(req: Request) {

  const session = await auth.api.getSession({
    headers: req.headers
  });


  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const files = formData.getAll("file") as File[];

  if (!files.length) {
    return Response.json({ error: "No images" }, { status: 400 });
  }

  const urls: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `uploads/products/${Date.now()}-${file.name}`;

    const command = new PutObjectCommand({
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);

    urls.push(key);
  }

  return Response.json({ success: true, message: "File uploaded", data: urls });
}
