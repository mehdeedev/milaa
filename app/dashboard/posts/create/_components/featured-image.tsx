"use client";

import { Button } from "@/components/ui/button";
import { CreatePostInput } from "@/lib/schema/post.schema";
import { useMediaStore } from "@/store/media.store";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturedImage() {
  const { openMediaDialog } = useMediaStore();
  const formMethods = useFormContext<CreatePostInput>();
  const featuredImage = useWatch({
    control: formMethods.control,
    name: "featuredImage",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>عکس شاخص</CardTitle>
      </CardHeader>
      <CardContent>
        {featuredImage?.url ? (
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square rounded-md  flex flex-col gap-4 relative overflow-hidden">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || ""}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm">
                <div className="text-gray-500">متن جایگزین:</div>
                <div>{featuredImage.alt || "-"}</div>
              </div>
              <div className="flex items-center mt-4 gap-4">
                <div className="flex-1 shrink-0">
                  <Button
                    variant={"secondary"}
                    className="w-full"
                    size={"sm"}
                    onClick={async (e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      const res = await openMediaDialog({ root: "" });
                      if (res?.item) {
                        formMethods.setValue("featuredImage", {
                          url: res.item.url,
                          alt: res.alt || "",
                        });
                      }
                    }}
                  >
                    <EditIcon />
                    ویرایش تصویر
                  </Button>
                </div>
                <div className="flex-1 shrink-0">
                  <Button
                    variant={"ghost"}
                    className="w-full"
                    size={"sm"}
                    onClick={() => {
                      formMethods.setValue("featuredImage", {
                        alt: "",
                        url: "",
                      });
                    }}
                  >
                    <TrashIcon />
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full aspect-square  rounded-md border border-dashed text-blue-400 flex items-center justify-center flex-col gap-4 hover:bg-blue-50 cursor-pointer"
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              const res = await openMediaDialog({ root: "" });
              formMethods.setValue("featuredImage", {
                url: res.item?.url || "",
                alt: res.alt || "",
              });
            }}
          >
            <PlusIcon size={32} />
            <div className="text-gray-500 text-sm">
              برای انتخاب عکس کلیک کنید
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
