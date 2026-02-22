'use client';

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ImageIcon, UploadIcon, X } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type LocalImage = {
  file: File;
  preview: string;
  isMain: boolean;
  alt: string;
};

export function ProductImages() {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const [images, setImages] = useState<LocalImage[]>([]);

  const onSelectFiles = async (files: FileList | null) => {
    if (!files) return;

    const newImages: LocalImage[] = Array.from(files).map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      isMain: images.length === 0 && index === 0,
      alt: "",
    }));

    const updated = [...images, ...newImages];
    setImages(updated);
    syncToForm(updated);

  };

  const setMainImage = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isMain: i === index,
    }));
    setImages(updated);
    syncToForm(updated);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    syncToForm(updated);
  };

  const syncToForm = (imgs: LocalImage[]) => {
    setValue(
      "images",
      imgs.map((img) => ({
        url: "",
        isMain: img.isMain,
        alt: img.alt,
      })),
      { shouldValidate: true },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تصاویر محصول</CardTitle>
        <CardAction>
          <Button variant={"secondary"} size={"sm"}>
            انتخاب از کتابخانه
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Upload box */}
        <label className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] cursor-pointer">
          <input
            type="file"
            multiple
            id="images"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => onSelectFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-50 rounded-full w-12 h-12 border border-gray-300 text-gray-400 flex items-center justify-center">
              <ImageIcon size={18} />
            </div>
            <p className="text-sm text-gray-500">
              تصویر مورد نظر را در این قسمت بکشید
            </p>
            <p className="text-xs text-gray-400 font-english">
              PNG or JPG (max. 5MB)
            </p>
            <Button variant={"secondary"} size={"sm"}>
              <UploadIcon /> انتخاب عکس
            </Button>
          </div>
        </label>

        {/* Error */}
        {errors.images && (
          <p className="text-sm text-red-500">
            {errors.images.message as string}
          </p>
        )}

        {/* Preview grid */}
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative rounded overflow-hidden border ${
                img.isMain ? "ring-2 ring-primary" : ""
              }`}
            >
              <img src={img.preview} className="object-cover w-full h-24" />
              <div className="p-2 bg-background">
                <Controller
                  name={`images.${index}.alt`}
                  defaultValue={img.alt}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Alt text (توضیح تصویر)"
                      className="w-full rounded-md border border-input px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                      onChange={(e) => {
                        field.onChange(e.target.value);

                        const updated = [...images];
                        updated[index].alt = e.target.value;
                        setImages(updated);
                        syncToForm(updated);
                      }}
                    />
                  )}
                />
              </div>

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full"
              >
                <X size={14} />
              </button>

              <button
                type="button"
                onClick={() => setMainImage(index)}
                className="absolute top-1 left-1 text-xs bg-black/60 text-white px-2 rounded"
              >
                {img.isMain ? "تصویر اصلی" : "انتخاب به‌عنوان اصلی"}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
