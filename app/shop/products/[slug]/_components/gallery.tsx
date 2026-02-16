import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductData } from "@/lib/types/product.type";
import Image from "next/image";

export function Gallery({ product }: { product: ProductData }) {
  return (
    <Carousel className="w-full" opts={{
        direction: 'rtl'
    }}>
      <CarouselContent>
        {product.images.map((image, i) => (
          <CarouselItem key={i}>
            <div className="relative pt-[100%] w-full overflow-hidden rounded">
              <div className="absolute inset-0 bg-gray-300">
                <Image
                  src={process.env.CDN_URL + "/" + image.url}
                  fill
                  alt={image.alt}
                  className="object-cover object-center"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
