import { s3 } from "@/lib/storage.config";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const dir = req.nextUrl?.searchParams?.get("dir") as string;
  const command = new ListObjectsV2Command({
    Bucket: process.env.LIARA_BUCKET_NAME,
    Prefix: dir, // only keys starting with this prefix
    Delimiter: "/",
  });

  const data = await s3.send(command);

  const files = data.Contents?.filter(folder => folder.Key !== dir) || [];
  
  const modifiedFiles = files.map((file) => {
    const splittedName = file.Key?.split(".");
    return {
      name: file.Key?.replace(dir, ''),
      lastModified: file.LastModified,
      size: file.Size,
      type: "file",
      extension: splittedName?.length
        ? splittedName[splittedName?.length - 1]
        : "",
      url: process.env.CDN_URL + "/" + file.Key
    };
  });
  const directories = data.CommonPrefixes?.map((p) => p.Prefix?.replace(dir, '')) || [];
  const modifiedDirectories = directories
    .map((folder) => ({
      name: folder?.slice(0, -1),
      type: "directory",
    }));

  return Response.json([...modifiedDirectories, ...modifiedFiles]);
}
