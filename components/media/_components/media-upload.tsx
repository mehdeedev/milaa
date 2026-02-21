"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import axios from "axios";

type MediaUploadProps = {
  onUploadCompleted: () => void;
  currentPath: string;
};

export function MediaUpload({ onUploadCompleted, currentPath }: MediaUploadProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("path", currentPath);
    debugger

    const response = await axios.post("/api/storage/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = +(progressEvent.progress || 0)?.toFixed(2);
        console.log(percentCompleted, progressEvent.progress);
        setProgress(percentCompleted * 100);
      },
    });

    debugger
  };

  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          ref.current?.click();
        }}
      >
        <UploadIcon />
        آپلود فایل
      </Button>

      <input
        ref={ref}
        className="hidden"
        type="file"
        onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
      />
    </>
  );
}
