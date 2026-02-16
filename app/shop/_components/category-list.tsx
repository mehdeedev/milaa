import { getCategoryListAction } from "@/lib/actions/category.action";
import Link from "next/link";

export async function CategoryList() {
  const { list, success } = await getCategoryListAction();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      {list?.map((cat) => (
        <Link href={`/shop/category/${cat.slug}`} key={cat._id} className="flex flex-col gap-2">
          <div className="bg-gray-100 rounded-lg h-32"></div>
          <div className="text-center">{cat.title}</div>
        </Link>
      ))}
    </div>
  );
}
