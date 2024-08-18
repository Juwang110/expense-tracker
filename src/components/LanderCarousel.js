import { Carousel } from "flowbite-react";

// Simple landing page image carousel using Flowbite
export function LanderCarousel() {
  return (
    <div className="h-full w-full sm:h-64 xl:h-64 2xl:h-80">
      <Carousel slideInterval={5000}>
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
      </Carousel>
    </div>
  );
}
