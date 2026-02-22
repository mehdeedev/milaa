import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "@/app/dashboard/products/data-table";
import { columns, Payment } from "@/app/dashboard/products/columns";
import Link from "next/link";
import { formatPriceWithCommas } from "@/lib/utils";


export default async function PostsPage() {
//   const data = await getData();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">نوشته‌ها</h1>
        <Link href="/dashboard/posts/create">
          <Button>
            <PlusIcon />
            افزودن نوشته
          </Button>
        </Link>
      </div>

      {/* <div className="grid grid-cols-4">
        <KPI value="355" title="مبلغ کل فروش (میلیون تومان)" action="%25" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <InputGroup>
            <InputGroupInput placeholder="جستجو..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 ">
              <Command className="">
                <CommandInput placeholder="وضعیت" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandItem>
                    <Field orientation="horizontal">
                      <Checkbox id="terms-checkbox" name="terms-checkbox" />
                      <Label htmlFor="terms-checkbox">
                        Accept terms and conditions
                      </Label>
                    </Field>
                  </CommandItem>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div> */}

      {/* <div className="container mx-auto">
        <DataTable columns={columns} data={data} />
      </div> */}
    </>
  );
}

const KPI = ({
  value,
  title,
  action,
}: {
  value: string;
  title: string;
  action: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{formatPriceWithCommas(value)}</CardTitle>
        <CardAction className="rounded-md bg-gray-100 text-sm px-2 py-0.5 text-green-600">
          {action}
        </CardAction>
      </CardHeader>
    </Card>
  );
};
