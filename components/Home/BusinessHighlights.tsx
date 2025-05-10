import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const ITEMS_LIST = [
  {
    img: "/assets/images/icon1.png",
    title: "concept",
    content: "contentConcept",
  },
  {
    img: "/assets/images/icon2.png",
    title: "restaurant",
    content: "contentRestaurant",
  },
  {
    img: "/assets/images/icon3.png",
    title: "location",
    content: "contentLocation",
  },
  {
    img: "/assets/images/icon4-1.png",
    title: "amountVisits",
    content: "contentAmount",
  },
  {
    img: "/assets/images/icon4-1.png",
    title: "loyalCustomer",
    content: "contentLoyalCustomer",
  },
  {
    img: "/assets/images/icon6.png",
    title: "partners",
    content: "contentPartners",
  },
];

const BusinessHighlights = () => {
  const { t, ready } = useTranslation("home");
  if (!ready) return null;
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
                loading="lazy"
                className="w-[57px] h-[57px] hover:bg-primary text-center leading-[54px] p-2 rounded-full bg-secondary-text"
              />
            </div>
            <div>
              <h3 className="text-primary-text hover:text-primary">
                {t(`${i.title}`)}
              </h3>
              <p className="text-secondary-text">{t(`${i.content}`)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessHighlights;
