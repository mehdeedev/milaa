"use client";

import {
  MediaContent,
  MediaHeader,
  MediaSidebar,
} from "@/components/media/_components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Media } from "@/lib/types/media";
import { useMediaStore } from "@/store/media.store";

import { useEffect, useState } from "react";

export function MediaDialog() {
  const { isMediaDialogOpen, closeMediaDialog, root, onSelectItem } =
    useMediaStore();
  const [currentPath, setCurrentPath] = useState(root);

  const [items, setItems] = useState<Media[]>([]);
  const [selectedItem, setSelectedItem] = useState<Media | null>(null);

  useEffect(() => {
    if (isMediaDialogOpen) {
      (async () => {
        setItems([]);
        const res = await fetch(`/api/storage?dir=${currentPath}`);
        const data: Media[] = await res.json();
        setItems(data);
      })();
    }
  }, [isMediaDialogOpen, currentPath]);

  const handleClose = () => {
    setItems([]);
    setCurrentPath("");
    setSelectedItem(null);
    closeMediaDialog();
  };

  return (
    <Dialog open={isMediaDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-max">
        <DialogHeader>
          <DialogTitle>کتابخانه چند رسانه‌ای</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-140 max-h-[75vh] gap-2 w-5xl">
          <MediaHeader
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
          />
          <div className="flex flex-1 h-10 gap-2">
            <MediaContent
              items={items}
              onFileClick={(item) => {
                if (item.type === "file") {
                  setSelectedItem(null);
                  setTimeout(() => {
                    setSelectedItem(item);
                  }, 1);
                }
              }}
              onDirectoryDblClick={(dir) => {
                setItems([]);
                setCurrentPath((prev) => prev + dir.name + "/");
              }}
            />

            <MediaSidebar
              selectedItem={selectedItem}
              onSelectItem={({ alt }) => {
                onSelectItem({ item: selectedItem!, alt });
                handleClose();
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
