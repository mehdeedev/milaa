import { FeatureData } from "@/lib/types/feature.type";
import { ProductData } from "@/lib/types/product.type";
import { FileSpreadsheetIcon } from "lucide-react";

const featureList: FeatureData[] = [
  {
    label: "دسته‌بندی",
    value: "نوشن",
  },
  {
    label: "حجم فایل",
    value: "۲ مگابایت",
  },
  {
    label: "حجم فاسیل",
    value: "۲ مگابایت",
  },
  {
    label: "تعداد صفحه",
    value: "۲۸۰ صفحه",
  },
];

export function Features({ product }: { product: ProductData }) {
  return (
    <div className="border rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">مشخصات</h2>
      <div className="flex flex-col text-sm">
        {featureList.map((feature) => (
          <FeatureItem feature={feature} key={feature.label} />
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ feature }: { feature: FeatureData }) {
  return (
    <div className="flex items-center gap-1 even:bg-primary/5 py-3.5 px-2 rounded">
      <FileSpreadsheetIcon size={16} />
      <div className="text-gray-500">{feature.label}</div>
      <div className="font-bold text-gray-700 mr-4">{feature.value}</div>
    </div>
  );
}
