import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface Restaurant {
  name: string;
  img1: string;
  img2: string;
  url: string;
  width: number;
  height: number;
}
interface RestaurantsConceptType {
  type: string;
  items: Array<Restaurant>;
}

const RESTAURANTS_CONCEPT = [
  {
    type: "HOTPOT",
    items: [
      {
        name: "Kichi-Kichi",
        img1: "/assets/images/kichi-01.png",
        img2: "/assets/images/kichi-02.png",
        url: "/kichi-kichi",
        width: 134,
        height: 55,
      },
      {
        name: "Hutong",
        img1: "/assets/images/hutong-01.png",
        img2: "/assets/images/hutong-02.png",
        url: "/hutong",
        width: 134,
        height: 55,
      },
      {
        name: "Manwah",
        img1: "/assets/images/manwah-01.png",
        img2: "/assets/images/manwah-02.png",
        url: "/manwah",
        width: 55,
        height: 55,
      },
    ],
  },
  {
    type: "BBQ",
    items: [
      {
        name: "Kpub",
        img1: "/assets/images/kpub-01.jpg",
        img2: "/assets/images/kpub-02.jpg",
        url: "/kpub",
        width: 55,
        height: 55,
      },
      {
        name: "Gogi",
        img1: "/assets/images/gogi2.png",
        img2: "/assets/images/gogi1.png",
        url: "/gogi",
        width: 55,
        height: 55,
      },
      {
        name: "Sumo Yakiniku",
        img1: "/assets/images/sumo2.png",
        img2: "/assets/images/sumo1.png",
        url: "/sumo-yakiniku",
        width: 55,
        height: 55,
      },
    ],
  },
  {
    type: "JAPANESE",
    items: [
      {
        name: "ISuShi",
        img1: "/assets/images/isushi-1.png",
        img2: "/assets/images/isushi-2.png",
        url: "/isushi",
        width: 65,
        height: 55,
      },
      {
        name: "Daruma",
        img1: "/assets/images/daruma-1.png",
        img2: "/assets/images/daruma-2.png",
        url: "/daruma",
        width: 55,
        height: 55,
      },
      {
        name: "Shogun",
        img1: "/assets/images/shogun-1.png",
        img2: "/assets/images/shogun-2.png",
        url: "/shogun",
        width: 65,
        height: 55,
      },
    ],
  },
  {
    type: "STEAK HOUSE",
    items: [
      {
        name: "Woomaster",
        img1: "/assets/images/woomaster2.png",
        img2: "/assets/images/woomaster1.png",
        url: "/woomaster",
        width: 72,
        height: 55,
      },
    ],
  },
  {
    type: "OTHER",
    items: [
      {
        name: "Phongon37",
        img1: "/assets/images/phongon_37_1.png",
        img2: "/assets/images/phongon_37_2.png",
        url: "/phongon37",
        width: 55,
        height: 55,
      },
      {
        name: "Cloudpot",
        img1: "/assets/images/cloudpot-2.png",
        img2: "/assets/images/cloudpot-1.png",
        url: "/cloudpot",
        width: 80,
        height: 55,
      },
      {
        name: "Crystal Jade",
        img1: "/assets/images/crystal-1.png",
        img2: "/assets/images/crystal-2.png",
        url: "/crystal-jade",
        width: 80,
        height: 55,
      },
      {
        name: "Hang cuon",
        img1: "/assets/images/hangcuon2.png",
        img2: "/assets/images/hangcuon1.png",
        url: "/hangcuon",
        width: 200,
        height: 55,
      },
    ],
  },
] as Array<RestaurantsConceptType>;

const ConceptsList = () => {
  return (
    <div
      className="not-prose w-full p-4 sm:w-[80%] lg:w-[60%] pt-[100px] pb-[50px] m-auto"
      style={{ fontFamily: "Inter" }}
    >
      {RESTAURANTS_CONCEPT.map((i) => {
        return (
          <div key={i.type} className="flex sm:flex-row flex-col pt-[20px]">
            <div className="sm:border-r border-b sm:border-b-0 border-dashed border-gray-300 sm:min-w-[150px] sm:h-[60px] flex flex-row items-center gap-2 sm:flex-col sm:items-start sm:gap-0">
              <h3 className="text-[18px] font-bold dark:text-secondary-text">
                {i.type}
              </h3>
              <p className="sm:text-xs text-[18px] font-bold sm:font-normal dark:text-secondary-text">
                CONCEPT
              </p>
            </div>
            <ul
              className={clsx(
                i.type === "OTHER"
                  ? "sm:grid-cols-4 2xl:w-[70%] sm:w-[80%]"
                  : "sm:grid-cols-3 2xl:w-[60%] sm:w-[90%]",
                "grid grid-cols-2 gap-4 w-full sm:h-auto h-[150px] p-1 px-4 sm:border-b sm:border-dashed sm:border-gray-300"
              )}
            >
              {i.items.map((restaurant) => {
                return (
                  <li key={restaurant.name} className="relative">
                    <Link href={restaurant.url}>
                      <Image
                        src={restaurant.img1}
                        alt={restaurant.name}
                        width={restaurant.width}
                        height={restaurant.height}
                        className="absolute h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
                      />
                      <Image
                        src={restaurant.img2}
                        alt={restaurant.name}
                        width={restaurant.width}
                        height={restaurant.height}
                        className="absolute h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ConceptsList;
