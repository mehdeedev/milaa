export interface Media {
  extension: string;
  lastModified: string;
  name: string;
  size: number;
  type: "file" | "directory";
  url: string;
}
