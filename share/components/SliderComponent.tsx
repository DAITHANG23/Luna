import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import clsx from "clsx";

interface SliderComponentProps {
  isSmallSize?: boolean;
  coverImages: Array<{ img: string; name: string }>;
}

const SliderComponent = ({
  isSmallSize = false,
  coverImages,
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
        {coverImages.map((i) => {
          return (
            <div
              key={i.name}
              className={clsx(
                isSmallSize
                  ? "h-[300px] sm:h-[300px] lg:h-[500px] border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-md mb-10"
                  : "h-[219px] xl:h-[1000px] sm:h-[600px]",
                "w-full flex items-center justify-center overflow-hidden relative"
              )}
            >
              <Image
                src={i.img}
                alt={i.name}
                fill
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
