import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


const banners = ["/banner (1).jpg", "/banner (2).jpg","/banner (3).jpg"]

function Banner() {
  return (
    <>
      <Carousel className="max-w-screen-xl" plugins={[
        Autoplay({
          delay: 4000,
        }),
        
      ]}>
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex h-[220px] w-[1275px] items-center justify-center p-2">
                    <img src={banner} alt="" className="rounded-md bg-cover" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default Banner;
