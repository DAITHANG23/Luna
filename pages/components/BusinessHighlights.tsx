import Image from "next/image";
import React from "react";

const ITEMS_LIST = [
  {
    img: "/assets/images/icon1.png",
    title: "Concept",
    content: "40+ Concepts",
  },
  {
    img: "/assets/images/icon2.png",
    title: "Restaurant",
    content: "500+ Restaurants",
  },
  {
    img: "/assets/images/icon3.png",
    title: "Location",
    content: "42 Provinces",
  },
  {
    img: "/assets/images/icon4-1.png",
    title: "Amount of visits in 2024",
    content: "18 million",
  },
  {
    img: "/assets/images/icon4-1.png",
    title: "Loyal customer",
    content: "Over 1,600,000",
  },
  {
    img: "/assets/images/icon6.png",
    title: "Partners",
    content: "With 118 organizations and companies",
  },
];

const BusinessHighlights = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[50px] p-4 w-full sm:w-[85%] m-auto py-[80px]">
      {ITEMS_LIST.map((i) => {
        return (
          <div
            key={i.title}
            className="flex gap-4 justify-start items-center col-span-1"
          >
            <div>
              <Image
                src={i.img}
                alt={i.title}
                width={57}
                height={57}
                className="w-[57px] h-[57px] hover:bg-primary text-center leading-[54px] p-2 rounded-full bg-secondary-text"
              />
            </div>
            <div>
              <h3 className="text-primary-text hover:text-primary">
                {i.title}
              </h3>
              <p className="text-secondary-text">{i.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessHighlights;
