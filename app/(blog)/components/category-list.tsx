import Link from "next/link";

type Category = {
  id: string;
  backgroundColor: string;
  textColor: string;
  title: string;
  description: string;
  slug: string;
};

const categories: Category[] = [
  {
    id: "1111",
    backgroundColor: "#fff1e6",
    textColor: "#a05000",
    title: "آموزش برنامه‌ریزی",
    description: "۲ مقاله",
    slug: "planning",
  },
  {
    id: "11121",
    backgroundColor: "#eae4e9",
    textColor: "#706b6c",
    title: "تفکر",
    description: "۱ مقاله",
    slug: "thinking",
  },
];

export function CategoryList() {
  return (
    <div className="flex justify-center px-4 ">
      <div className="flex flex-col gap-6 w-6xl max-w-full">
      <h2 className="font-pinar text-2xl font-bold text-gray-700 text-center">
        مسیر شیرین یادگیری
      </h2>
      <p className="text-gray-700 text-sm text-center">
        چه موضوعی این روزها بیشتر ذهنتان را درگیر کرده؟ برای شروع کشف و
        ماجراجویی، روی آن دسته کلیک کنید 🙂
      </p>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
        {categories.map((cat) => (
          <CategoryItem key={cat.id} item={cat} />
        ))}
      </div>
    </div>
      </div>
  );
}

function CategoryItem({ item }: { item: Category }) {
  const { backgroundColor, description, textColor, title, slug } = item;
  return (
    <Link href={`/${slug}`}>
      <div
        className={`rounded-md p-4 flex items-center gap-4`}
        style={{ backgroundColor }}
      >
        <div className="bg-white rounded-full w-24 h-24"></div>
        <div>
          <h3 style={{ color: textColor }} className="font-pinar font-bold">{title}</h3>
          <div className="font-pinar mt-2 text-sm">{description}</div>
        </div>
      </div>
    </Link>
  );
}
