import { getProductBySlugAction } from "@/lib/actions/product.action";
import {
  ButtonCounter,
  Content,
  Description,
  Features,
  Gallery,
  Price,
  Rating,
  RelatedProducts,
  StickyBottom,
  Title,
} from "@/app/shop/products/[slug]/_components";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // const [activeImage, setActiveImage] = useState(images[0]);
  const { item, success } = await getProductBySlugAction(slug);

  if (!item) {
    return "";
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Gallery product={item} />

        <Title product={item} />
        <Rating />
        <Description product={item} />
        <Price product={item} />
        <ButtonCounter productId={item?._id || ""} />
        <Features product={item} />
        <Content product={item} />
      </div>
      <div className="">
        <RelatedProducts product={item} />
      </div> 
    </>
  );
}
