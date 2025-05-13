import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import clsx from "clsx";

interface SliderComponentProps {
  isSmallSize?: boolean;
  coverImages?: Array<{ img: string; name: string }>;
  banners?: Array<string>;
}

const SliderComponent = ({
  isSmallSize = false,
  coverImages,
  banners,
}: SliderComponentProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container">
      <Slider
        {...settings}
        className={clsx(
          isSmallSize ? "w-[90%] xl:!w-[80%] " : "w-full",
          " text-center items-center m-auto"
        )}
      >
        {coverImages &&
          coverImages.map((i) => {
            return (
              <div
                key={i.name}
                className={clsx(
                  isSmallSize
                    ? "h-[300px] sm:h-[300px] lg:h-[550px] border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-md mb-10"
                    : "h-[219px] sm:h-[300px] lg:h-screen",
                  "w-full flex items-center justify-center overflow-hidden relative"
                )}
              >
                <Image
                  src={i.img}
                  alt={i.name}
                  fill
                  loading="lazy"
                  className="object-cover sm:object-fill hover:scale-105 transition-transform duration-500"
                />
              </div>
            );
          })}
        {banners &&
          banners.map((i, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "w-full flex items-center justify-center overflow-hidden relative h-[300px] sm:h-[300px] lg:h-[550px] border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-md mb-10"
                )}
              >
                <Image
                  src={i}
                  alt={`img-${index}`}
                  fill
                  loading="lazy"
                  className="object-cover sm:object-fill hover:scale-105 transition-transform duration-500"
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
