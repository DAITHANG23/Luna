import { ConceptModel } from "@/@types/models/concept";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import ModalCarousel from "@/libs/shared/components/ModalCarousel";
import {
  DEFAULT_CONCEPTS_LIST,
  GET_CHECK_IN_CONCEPTS_KEY,
  GET_CONCEPTS_FAVORITE_KEY,
} from "@/contants";
import useFavoriteConcepts from "@/features/hooks/ConceptsHooks/useFavoriteConcepts";
import apiService from "@/api";
import useGetDataUser from "@/features/hooks/AccountHooks/useGetDataUser";
import { useQueryClient } from "@tanstack/react-query";
import useCheckInConcept from "@/features/hooks/ConceptsHooks/useCheckInConcept";
import StarIcon from "@/libs/assets/StarIcon";
interface ConceptItemProps {
  concept: ConceptModel;
}
const ConceptItem = ({ concept }: ConceptItemProps) => {
  const { userData, refetch } = useGetDataUser();
  const queryClient = useQueryClient();
  const isFavoriteConceptSelected = userData?.data.data.favorites?.includes(
    concept._id
  );

  const isCheckInConceptSelected =
    userData?.data.data.checkInConcepts?.includes(concept._id);

  const [isFavoriteConcept, setIsFavoriteConcept] = useState(
    isFavoriteConceptSelected
  );

  const [isCheckedInConcept, setIsCheckedInConcept] = useState(
    isCheckInConceptSelected
  );

  useEffect(() => {
    if (isFavoriteConceptSelected) {
      setIsFavoriteConcept(isFavoriteConceptSelected);
    }

    if (isCheckInConceptSelected) {
      setIsCheckedInConcept(isCheckInConceptSelected);
    }
  }, [isFavoriteConceptSelected, isCheckInConceptSelected]);

  const [isOpenModalImageList, setIsOpenModalImageList] = useState(false);

  const { mutate: favoriteConcepts } = useFavoriteConcepts();

  const { mutate: checkInConcept } = useCheckInConcept();

  const typeConcept = useMemo(() => {
    if (!concept?.type) return "OTHER";
    return (
      DEFAULT_CONCEPTS_LIST.find((i) => i.value === concept?.type)?.label || ""
    );
  }, [concept]);

  const handleClickFavorite = useCallback(
    async (idConcept: string) => {
      const formData = {
        idConcept: idConcept,
        userId: userData?.data.data._id || "",
      };
      if (isFavoriteConceptSelected) {
        await apiService.user.deleteFavoriteConcept({ formData });
        queryClient.invalidateQueries({
          queryKey: [GET_CONCEPTS_FAVORITE_KEY],
        });
        refetch();
      } else {
        favoriteConcepts(formData);
      }

      setIsFavoriteConcept((prev) => !prev);
    },
    [
      isFavoriteConceptSelected,
      userData,
      refetch,
      favoriteConcepts,
      queryClient,
    ]
  );

  const handleClickCheckIn = useCallback(
    async (idConcept: string) => {
      const formData = {
        idConcept: idConcept,
        userId: userData?.data.data._id || "",
      };
      if (isCheckedInConcept) {
        await apiService.user.deleteCheckInConcept({ formData });
        queryClient.invalidateQueries({
          queryKey: [GET_CHECK_IN_CONCEPTS_KEY],
        });
        refetch();
      } else {
        checkInConcept(formData);
      }

      setIsCheckedInConcept((prev) => !prev);
    },
    [isCheckedInConcept, userData, refetch, checkInConcept, queryClient]
  );

  return (
    <div className="relative h-[28.125rem] flex flex-col border-2 border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-xl duration-300 transition-all ease-in-out dark:shadow-md dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] dark:transition-shadow dark:duration-300">
      <ModalCarousel
        setOpen={setIsOpenModalImageList}
        open={isOpenModalImageList}
        imagesList={concept?.images}
      />
      <div className="w-full h-[300px] relative ">
        <Image
          src={concept?.imageCover}
          alt={concept?.name}
          fill
          className="rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none"
          loading="lazy"
        />
        <button
          className="absolute bottom-4 right-4 text-white w-6 h-6"
          onClick={() => setIsOpenModalImageList(true)}
        >
          <Square2StackIcon className="text-white w-8 h-8" />
        </button>
      </div>
      <div className="p-4 flex flex-col justify-start items-start gap-2">
        <h3 className="text-primary-text">{concept?.name || ""}</h3>
        <p className="text-primary-text text-sm">{typeConcept}</p>
        <p className="text-primary-text text-sm">{concept?.address || ""}</p>
        <div className="text-primary text-sm flex gap-1 justify-center items-center font-bold">
          <StarIcon />
          {concept?.avgRatings || 0}
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <a
            href="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            0 reviews
          </a>
        </div>
      </div>
      <div className="absolute top-[10px] right-[10px] flex gap-3">
        <button
          className="border-none bg-white rounded-full p-1 cursor-pointer"
          onClick={() => {
            handleClickCheckIn(concept?._id);
          }}
        >
          {isCheckedInConcept ? (
            <CheckCircleIconSolid className="text-green-500 w-5 h-5" />
          ) : (
            <CheckCircleIcon className="text-black w-5 h-5" />
          )}
        </button>
        <button
          className="border-none bg-white rounded-full p-1 cursor-pointer"
          onClick={() => handleClickFavorite(concept?._id)}
        >
          <div className="w-5 h-5">
            {isFavoriteConcept ? (
              <HeartIconSolid className="text-primary w-full h-full" />
            ) : (
              <HeartIcon className="text-black w-full h-full" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ConceptItem;
