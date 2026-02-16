"use client";

import { CreateCategoryDialog } from "@/app/dashboard/categories/_components/create-category-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function CreateCategoryButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <PlusIcon />
        افزودن دسته‌بندی
      </Button>

      <CreateCategoryDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
}
