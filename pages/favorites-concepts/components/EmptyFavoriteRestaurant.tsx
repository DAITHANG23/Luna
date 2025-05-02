import React from "react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const EmptyFavoriteRestaurant = () => {
  const { t } = useTranslation("concept");
  return (
    <div className="flex flex-col w-full sm:w-[21.75rem] !h-[19.7rem] shadow-glass border-none rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105">
      <div className="flex text-center  w-full h-[3.3rem] p-4 gap-4 bg-white rounded-xl">
        <p>
          <HeartIconSolid className="text-primary w-full h-full" />
        </p>
        <p className="font-base font-normal">{t("titleRestaurantFavorite")}</p>
      </div>
      <div className="w-full h-[8.75rem] relative rounded-xl">
        <Image
          src={"/assets/images/favoriteRestaurant.gif"}
          alt="favorite-restaurant"
          fill
          objectFit="contain"
        />
      </div>
      <p className="pt-8">{t("emptyListTitle")}</p>
    </div>
  );
};

export default EmptyFavoriteRestaurant;
