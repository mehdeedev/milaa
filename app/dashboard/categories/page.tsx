import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/app/dashboard/categories/_components/data-table/data-table";
import { columns } from "@/app/dashboard/categories/_components/data-table/columns";
import Link from "next/link";
import { formatPriceWithCommas } from "@/lib/utils";
import { getDashboardCategoryListAction } from "@/lib/actions/category.action";
import { CreateCategoryButton } from "@/app/dashboard/categories/_components";

export default async function Categories() {
  const result = await getDashboardCategoryListAction();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">دسته‌بندی‌ها</h1>
        <CreateCategoryButton />
      </div>

      <div className="container mx-auto">
        <DataTable columns={columns} data={result?.list || []} />
      </div>
    </>
  );
}
