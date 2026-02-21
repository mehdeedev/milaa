import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type LatestPost = {
  title: string;
  id: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  categories: {
    title: string;
    slug: string;
  }[];
  author: {
    name: string;
    slug: string;
  };
  studyTime: string;
  slug: string;
};
const latestPosts: LatestPost[] = [
  {
    id: "wqewqeqe",
    title: "هواپونوپونو چیست و چرا مزخرفی بیش نیست؟",
    description:
      "دیدن شبکه‌های اجتماعی، کلاس‌های یوگا و وب فارسی که پر شده است از «معجزه‌های هواپونوپونو» واقعاً غم‌انگیز است! تمام محتواها روی «مانترای هواوپونوپونو» و چهار جملۀ زیر تمرکز دارند: متأسفم...",
    author: {
      name: "سمیرا سرباز",
      slug: "sarbuzz",
    },
    categories: [
      {
        slug: "thinking",
        title: "تفکر",
      },
      {
        title: "حالِ خوب",
        slug: "well-being",
      },
    ],
    image: {
      url: "https://milaaplan.com/wp-content/uploads/2026/02/hooponopono.jpg",
      alt: "ax",
    },
    studyTime: "۱۸ دقیقه",
    slug: "hooponopono",
  },
];
export function LatestPosts() {
  return (
    <div className="flex justify-center px-4 ">
      <div className="flex flex-col gap-6 w-6xl max-w-full">
        <h2 className="font-pinar text-2xl font-bold text-gray-700 text-center">
          آخرین مقاله‌ها
        </h2>
        <div>
          <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostItem item={post} key={post.id} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-8">
            <Button>سایر مقاله‌ها را مشاهده کنید</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostItem({ item }: { item: LatestPost }) {
  const { author, categories, description, image, studyTime, title, slug } =
    item;
  return (
    <div className="shadow-md rounded-md flex flex-col overflow-hidden">
      <Link href={`/${categories[0].slug}/${slug}`} className="block w-full">
        <div className="w-full relative">
          <Image
            src={image.url}
            alt={image.alt}
            width={300}
            height={200}
            className="object-cover w-full"
          />
        </div>
      </Link>
      <div className="px-4 flex flex-col gap-4 py-4">
        <div className="flex flex-wrap gap-2 items-center text-sm">
          {categories.map((cat) => (
            <Link
              className="bg-[#B0CEB8] rounded-full px-3 py-1"
              key={cat.slug}
              href={`/${cat.slug}`}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        <h2 className="text-base text-gray-700 font-pinar font-bold">
          {title}
        </h2>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <Link href={`/author/${author.slug}`} className="text-primary">
            {author.name}
          </Link>
          <div className="h-3 border-r-2" />
          <div>
            زمان مطالعه:
            {studyTime}
          </div>
        </div>
      </div>
    </div>
  );
}
