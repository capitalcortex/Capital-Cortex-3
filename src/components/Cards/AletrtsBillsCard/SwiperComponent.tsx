import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

type SwiperComponentProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
  };
  const breakpoints = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1240: { slidesPerView: 4 },
  };
const SwiperComponent = <T,>({ items, renderItem }: SwiperComponentProps<T>) => (
    <Swiper
      className="!block sm:!hidden mb-4"
      autoplay={true}
      speed={200}
      spaceBetween={24}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      breakpoints={breakpoints}
    >
      {items.map((item, i) => (
        <SwiperSlide key={i}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
  
  export default SwiperComponent;
  