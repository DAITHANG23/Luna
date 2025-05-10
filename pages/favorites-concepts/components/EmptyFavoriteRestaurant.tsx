import React from "react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
interface EmptyFavoriteRestaurantProps {
  isVisitedConcept?: boolean;
}
const EmptyFavoriteRestaurant = ({
  isVisitedConcept,
}: EmptyFavoriteRestaurantProps) => {
  const { t } = useTranslation("concept");
  return (
    <div className="flex flex-col w-full sm:w-[21.75rem] !h-[19.7rem] bg-white shadow-glass border-none rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105">
      <div className="flex text-center w-full h-[3.3rem] p-4 gap-4 bg-white rounded-xl">
        {isVisitedConcept ? (
          <CheckCircleIconSolid className="text-black w-7 h-7" />
        ) : (
          <HeartIconSolid className="text-primary w-7 h-7" />
        )}
        <p className="font-base font-bold">
          {isVisitedConcept ? t("visited") : t("titleRestaurantFavorite")}
        </p>
      </div>
      <div className="w-full h-[8.75rem] flex justify-center items-center rounded-xl mt-4">
        {isVisitedConcept ? (
          <CheckCircleIcon className="text-gray-400 w-10 h-10" />
        ) : (
          <Image
            src={"/assets/images/favoriteRestaurant.gif"}
            alt="favorite-restaurant"
            fill
            objectFit="contain"
            loading="lazy"
          />
        )}
      </div>
      <p className="pt-8">{t("emptyListTitle")}</p>
    </div>
  );
};

export default EmptyFavoriteRestaurant;
