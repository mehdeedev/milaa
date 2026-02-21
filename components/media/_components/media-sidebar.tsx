"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Media } from "@/lib/types/media";
import { formatJalaliDate, shortenString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type MediaSidebarProps = {
  selectedItem: Media | null;
  onSelectItem: (data: { alt?: string }) => void;
};

const schema = z.object({
  altText: z.string().optional(),
});

type InputValues = z.infer<typeof schema>;

export function MediaSidebar({
  selectedItem,
  onSelectItem,
}: MediaSidebarProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      altText: "",
    },
  });

  const onSubmit: SubmitHandler<InputValues> = (data) => {
    onSelectItem({ alt: data.altText });
  };

  return (
    <div className="w-60 shrink-0 flex flex-col justify-between">
      <div>
        <div className="aspect-square relative bg-gray-100">
          {selectedItem && selectedItem.type === "file" ? (
            <Image
              src={selectedItem.url}
              alt="ax"
              width={300}
              height={300}
              className="w-full object-cover h-full object-center"
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="text-gray-500">نام فایل:</div>
            <div dir="ltr">{shortenString(selectedItem?.name || "")}</div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="text-gray-500">حجم فایل:</div>
            <div dir="ltr">
              {selectedItem
                ? (selectedItem.size / 1000).toFixed(0) + " KB"
                : "—"}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="text-gray-500">تاریخ ایجاد:</div>
            <div>
              {selectedItem
                ? formatJalaliDate(new Date(selectedItem.lastModified), {
                    year: "numeric",
                  })
                : "—"}
            </div>
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            {selectedItem ? (
              <Controller
                name="altText"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="متن جایگزین (alt)"
                    className="bg-white"
                    {...field}
                  />
                )}
              />
            ) : (
              <div className="mt-2 h-10 rounded-md bg-gray-100" />
            )}
          </div>
          {selectedItem ? (
            <Button type="submit" className="w-full">
              انتخاب فایل
            </Button>
          ) : (
            <div className="mt-2 h-10  rounded-md bg-gray-100" />
          )}
        </form>
      </div>
    </div>
  );
}
