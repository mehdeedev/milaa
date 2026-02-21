import { formatPriceWithCommas } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  price: string;
  slug: string;
  image: {
    url: string;
    alt: string;
  };
};

const latestProducts: Product[] = [
  {
    id: "11121",
    title: "شیت برنامه‌ریزی با بلوک زمانی",
    price: "29000",
    slug: "weekly-time-blocking",
    image: {
      url: "https://milaaplan.com/wp-content/uploads/2026/02/Time-blocking-weekly-1-600x600.jpg",
      alt: "ax",
    },
  },
];

export function ProductList() {
  return (
    <div className="flex justify-center px-4 ">
      <div className="flex flex-col gap-6 max-w-full w-6xl">
        <h2 className="font-pinar text-2xl font-bold text-gray-700 text-center">
          جعبه ابزار برنامه‌ریزی و توسعه فردی
        </h2>
        <p className="text-gray-700 text-sm text-center">
          کتاب، تست، تمپلیت یا هرچیزی را که برای توسعه فردی نیاز دارید، از جعبه
          ابزار میلاپلن بردارید.
        </p>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
          {latestProducts.map((product) => (
            <ProductItem key={product.id} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductItem({ item }: { item: Product }) {
  const { title, slug, price, image } = item;
  return (
    <Link href={`/shop/${slug}`}>
      <div
        className={`rounded-md border overflow-hidden border-gray-200 w-full p-2 flex flex-col gap-4 shadow-md pb-4`}
      >
        <div className="relative w-full">
          <Image
            src={image.url}
            alt={image.alt}
            className="object-cover w-full"
            width={300}
            height={300}
          />
        </div>
        <h2 className="font-pinar text-lg">{title}</h2>
        <div>{formatPriceWithCommas(price)} تومان</div>
      </div>
    </Link>
  );
}
