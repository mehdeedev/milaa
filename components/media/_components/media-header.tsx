import { MediaUpload } from "@/components/media/_components/media-upload";
import { ChevronLeft, HomeIcon } from "lucide-react";
import React from "react";

type MediaHeaderProps = {
  currentPath: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
};

export function MediaHeader({ currentPath, setCurrentPath }: MediaHeaderProps) {
  const pathStacks = currentPath.split("/");

  return (
    <div className="w-full flex shrink-0 border border-gray-200 p-2 rounded-md justify-between">
      <div className="flex items-center gap-2 mr-4 text-gray-500 text-sm">
        <HomeIcon
          className="stroke-1 text-gray-600 cursor-pointer"
          size={20}
          onClick={() => {
            setCurrentPath("");
          }}
        />
        {pathStacks.map((p, i) => {
          const isNotLastItem = i < pathStacks.length - 1;
          return (
            <React.Fragment key={i}>
              {isNotLastItem ? (
                <ChevronLeft className="stroke-1 text-gray-400" size={16} />
              ) : (
                ""
              )}
              <span
                onClick={() => {
                  setCurrentPath(pathStacks.slice(0, i + 1).join("/") + "/");
                }}
                className={`${i < pathStacks.length - 2 ? "cursor-pointer hover:text-gray-700" : ""}`}
              >
                {p}
              </span>
            </React.Fragment>
          );
        })}
      </div>
      <MediaUpload currentPath={currentPath} onUploadCompleted={() => {}} />
    </div>
  );
}
