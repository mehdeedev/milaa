import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <BreadcrumbComponent className="mb-6" dir="rtl">
      <BreadcrumbList>
      {items.map((item, index) => (
        <>
        <BreadcrumbItem key={item.label}>
          <BreadcrumbLink asChild>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>

          ) : <>{item.label}</>}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        </>
      ))}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}
