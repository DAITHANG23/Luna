import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { RESTAURANTS_CONCEPT } from "@/contants";
import { cn } from "@/utils";
import ContactComponent from "@/libs/shared/components/ContactComponent";
import { MailIcon, PhoneIcon } from "@/libs/assets";

interface ConceptsListProps {
  isBannerWidth?: boolean;
}

const ConceptsList = ({ isBannerWidth }: ConceptsListProps) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div
        className={cn(
          isBannerWidth &&
            "xl:!w-[70%] border-b-4 sm:border-b-0 sm:border-r-4 !mx-0",
          "not-prose w-full p-4 xl:w-[60%] pt-[50px] lg:pt-[100px] pb-[50px] mx-auto"
        )}
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
                    ? "xl:grid-cols-4 2xl:w-[70%] sm:w-[80%]"
                    : "xl:grid-cols-3 2xl:w-[60%] sm:w-[90%]",
                  "grid grid-cols-2 gap-4 w-full xl:h-auto h-[150px] p-1 px-4 sm:border-b sm:border-dashed sm:border-gray-300"
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
                          loading="lazy"
                          className="absolute h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
                        />
                        <Image
                          src={restaurant.img2}
                          alt={restaurant.name}
                          width={restaurant.width}
                          height={restaurant.height}
                          loading="lazy"
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
      {isBannerWidth && (
        <div className="p-4">
          <h4 className="pb-[20px] text-primary-text">Contact us</h4>
          <div className="text-center flex justify-center">
            <ContactComponent />
          </div>

          <div className="flex flex-col gap-4 pt-[50px]">
            <div className="flex gap-2">
              <MailIcon />
              <p className="text-primary-text">
                Nguyendaithang23061997@gmail.com
              </p>
            </div>
            <div className="flex gap-2">
              <PhoneIcon /> <p className="text-primary-text">0772757220</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptsList;
