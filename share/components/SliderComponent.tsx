import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const coverImages = [
  { img: "/assets/images/cover-img-1.jpg", name: "cover-1-img" },
  { img: "/assets/images/cover-img-2.jpg", name: "cover-2-img" },
  { img: "/assets/images/cover-img-3.png", name: "cover-3-img" },
  { img: "/assets/images/cover-img-4.png", name: "cover-4-img" },
  { img: "/assets/images/cover-img-5.png", name: "cover-5-img" },
  { img: "/assets/images/cover-img-6.jpg", name: "cover-6-img" },
];

const SliderComponent = () => {
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
      <Slider {...settings} className=" text-center items-center">
        {coverImages.map((i) => {
          return (
            <div
              key={i.name}
              className="h-[1000px] w-full flex items-center justify-center overflow-hidden"
            >
              <Image
                src={i.img}
                alt={i.name}
                width={10000}
                height={500}
                className="w-full h-full"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
