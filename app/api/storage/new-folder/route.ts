import type { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { folderName } = JSON.parse(req.body) as { folderName?: string };

    if (!folderName) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    const bucketName = process.env.AWS_S3_BUCKET!;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `${folderName}/`,
      Body: "",
    });

    await s3.send(command);

    return res.status(200).json({ message: `Folder '${folderName}' created.` });
  } catch (error) {
    console.error("Error creating folder:", error);
    return res.status(500).json({ error: "Failed to create folder" });
  }
}
