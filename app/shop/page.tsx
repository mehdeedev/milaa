import { CategoryList } from "@/app/shop/_components/category-list";
import { LatestProductList } from "@/app/shop/_components/latest-product-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function ShopPage() {
  return (
    <div className="flex justify-center">
      <div className="w-6xl max-w-full">
        <div className="grid grid-cols-1 gap-8 py-4">
          {/* Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4"  dir="ltr">
            <div className="bg-gray-100 rounded-lg h-64"></div>
            <div
              dir="rtl"
              className="flex flex-col items-start justify-center gap-4"
            >
              <div className="font-bold text-3xl">اینجا قراره یه متن بیاد</div>
              <div className="text-gray-400">اینجا قراره یه متن بیاد</div>
              <div>
                <Button size={"lg"}>دکمه</Button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <section className="px-4">
            <h2 className="text-center text-2xl font-bold">دسته‌بندی</h2>
            <Suspense fallback={"loading..."}>
              <CategoryList />
            </Suspense>
          </section>

          {/* Banner */}
          <div className=" flex gap-4 mx-4 items-center">
          <div className="bg-gray-100 rounded-lg h-48 flex-1" />
          <div className="bg-gray-100 rounded-lg h-48 flex-1 hidden md:block" />

          </div>

          {/* Products with full width gray background */}
          <div className="bg-[#f6ede5] px-4 flex flex-col gap-8 py-8">
            <h2 className="text-2xl font-bold text-center">آخرین <span className="text-primary">محصولات</span></h2>
            <Suspense fallback={"loading..."}>
              <LatestProductList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
