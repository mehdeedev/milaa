import { Media } from "@/lib/types/media";
import { shortenString } from "@/lib/utils";
import { FileMusicIcon, FileTextIcon, FilmIcon, FolderIcon } from "lucide-react";
import Image from "next/image";

type MediaContentProps = {
    items: Media[];
    onFileClick: (file: Media) => void;
    onDirectoryDblClick: (dir: Media) => void; 
}

export function MediaContent({ items, onFileClick, onDirectoryDblClick }: MediaContentProps) {
  return (
    <div
      className="grid grid-cols-5 gap-4 gap-y-6 flex-1 overflow-y-auto pl-2"
      dir="ltr"
    >
      {items.map((item) => (
        <div key={item.url}>
          <div
            className="bg-gray-50 select-none rounded p-2 cursor-pointer aspect-square relative flex items-center justify-center"
            onClick={() => {
              if (item.type === "file") {
                onFileClick(item)
              }
            }}
            onDoubleClick={() => {
              onDirectoryDblClick(item)
            }}
          >
            {item.type === "directory" ? (
              <FolderIcon size={36} className="text-blue-600 stroke-1" />
            ) : (
              ""
            )}
            {item.extension === "mp3" ? (
              <FileMusicIcon size={36} className="text-gray-400 stroke-1" />
            ) : (
              ""
            )}
            {item.extension === "txt" ? (
              <FileTextIcon size={36} className="text-gray-400 stroke-1" />
            ) : (
              ""
            )}
            {["mp4", "mov"].includes(item.extension) ? (
              <FilmIcon size={36} className="text-gray-400 stroke-1" />
            ) : (
              ""
            )}
            {["jpg", "png", "jpeg", "svg"].includes(item.extension) ? (
              <Image
                src={item.url}
                alt="ax"
                width={100}
                height={100}
                className="w-full object-cover h-full object-center"
              />
            ) : (
              ""
            )}
          </div>
          <div
            className="text-xs font-english text-center mt-1 overflow-hidden box-border"
            dir="ltr"
          >
            {shortenString(item.name)}
          </div>
        </div>
      ))}
    </div>
  );
}


