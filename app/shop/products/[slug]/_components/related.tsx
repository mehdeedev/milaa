import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductData } from "@/lib/types/product.type";

export function RelatedProducts({ product }: { product: ProductData }) {
  return (
    <section>
      <h2 className="h2 px-4">محصولات مرتبط</h2>
      <Carousel
        opts={{
          direction: "rtl",
        }}
      >
        <CarouselContent className="ml-0">
          <CarouselItem className="basis-2/3 pr-4">
            <div className="p-1 border h-20"></div>
          </CarouselItem>
          <CarouselItem className="basis-2/3 pr-4">
            <div className="p-1 border h-20"></div>
          </CarouselItem>
          <CarouselItem className="basis-2/3 pr-4">
            <div className="p-1 border h-20"></div>
          </CarouselItem>
          <CarouselItem className="basis-2/3 pr-4">
            <div className="p-1 border h-20"></div>
          </CarouselItem>
          <CarouselItem className="basis-2/3 pr-4">
            <div className="p-1 border h-20"></div>
          </CarouselItem>
          <CarouselItem className="basis-2/3 px-4">
            <div className="p-1 border h-20"></div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
