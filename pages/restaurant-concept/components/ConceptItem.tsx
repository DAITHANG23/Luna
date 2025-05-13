import { ConceptModel, ReviewPost } from "@/@types/models";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import ModalCarousel from "@/libs/shared/components/ModalCarousel";
import {
  CONCEPTS_ROUTES,
  DEFAULT_CONCEPTS_LIST,
  GET_CHECK_IN_CONCEPTS_KEY,
  GET_CONCEPTS_FAVORITE_KEY,
} from "@/contants";
import useFavoriteConcepts from "@/features/hooks/ConceptsHooks/useFavoriteConcepts";
import apiService from "@/api";
import useGetDataUser from "@/features/hooks/AccountHooks/useGetDataUser";
import { useQueryClient } from "@tanstack/react-query";
import useCheckInConcept from "@/features/hooks/ConceptsHooks/useCheckInConcept";
import { StarIcon } from "@/libs/assets";
import ModalComponent from "@/libs/shared/components/ModalComponent";
import useReviewConcept from "@/features/hooks/ConceptsHooks/useReviewConcept";
import { cn } from "@/utils/css";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
interface ConceptItemProps {
  concept: ConceptModel;
  isReviewBtn?: boolean;
}
const ConceptItem = ({ concept, isReviewBtn = false }: ConceptItemProps) => {
  const { t } = useTranslation("concept");
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

  const router = useRouter();

  const [isOpenModalImageList, setIsOpenModalImageList] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [scoreReviewConcept, setScoreReviewConcept] = useState<number>(0);

  const [valueContentReview, setValueContentReview] = useState("");

  const [isDoneReview, setIsDoneReview] = useState(false);

  const { mutate: favoriteConcepts } = useFavoriteConcepts();

  const { mutate: checkInConcept } = useCheckInConcept();

  const { mutate: reviewPost } = useReviewConcept();

  const handleClickConcept = () => {
    const route =
      CONCEPTS_ROUTES.find((c) => c.name === concept.name)?.route || "";
    localStorage.setItem("routeConcept", route);
    router.push(`/${route}`);
  };

  useEffect(() => {
    if (!isOpenModal) setIsDoneReview(false);
  }, [isOpenModal]);

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

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValueContentReview(value);
  };

  const handleSubmitReviewConcept = () => {
    const formData: ReviewPost = {
      conceptId: concept._id,
      score: scoreReviewConcept,
      content: valueContentReview,
    };

    reviewPost(formData);
    setIsDoneReview(true);

    setScoreReviewConcept(0);
    setValueContentReview("");
  };

  const isInvalid =
    scoreReviewConcept <= 0 || valueContentReview.trim().length < 5;

  return (
    <div className="relative h-[28.125rem] flex flex-col border-2 border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-xl duration-300 transition-all ease-in-out dark:shadow-md dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] dark:transition-shadow dark:duration-300">
      <ModalCarousel
        setOpen={setIsOpenModalImageList}
        open={isOpenModalImageList}
        imagesList={concept?.images}
      />
      <ModalComponent open={isOpenModal} setOpen={setIsOpenModal}>
        <div
          className={cn(
            isDoneReview
              ? "h-[18.75rem] sm:h-[15rem]"
              : "h-auto sm:h-[31.25rem]",
            "w-full sm:w-[42.5rem] mt-10 mx-auto"
          )}
        >
          {isDoneReview ? (
            <div className="w-[80%] mx-auto">
              <h1 className="text-3xl text-primary-text">{t("allDone")} 🎉</h1>
              <p className="pt-10 text-primary-text">{t("thankForSharing")}</p>
              <div className="flex justify-end mt-10">
                <button
                  className="bg-black text-white rounded-lg text-sm py-[10px] px-[13px] hover:scale-105 transition duration-200"
                  onClick={() => {
                    setIsOpenModal(false);
                  }}
                >
                  {t("button.close")}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-primary-text">
              <h1 className="text-3xl text-center">{t("pleaseShare")}</h1>
              <div className="mt-11">
                <p>{t("howWasTheRestaurant")}</p>
                <div className="flex gap-2 mt-4 justify-center items-center text-center">
                  {Array.from({ length: 5 }, (v, i) => {
                    return (
                      <div key={i}>
                        <button
                          className={cn(
                            scoreReviewConcept - 1 === i && "bg-gray-300",
                            "border rounded-md w-8 h-8 pt-1 text-center hover:bg-gray-300"
                          )}
                          onClick={() => setScoreReviewConcept(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around mt-2 max-w-full sm:max-w-[25rem] mx-auto text-gray-500">
                  <p> {t("terrible")}</p> <p> {t("amazing")}</p>
                </div>
              </div>
              <div className="mt-16">
                <label>{t("pleaseShareAnyAdditional")}</label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full mt-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placehoderTextarea")}
                  onChange={(e) => handleChangeText(e)}
                />
              </div>
              <div className="flex justify-end mt-10">
                <button
                  className={cn(
                    isInvalid
                      ? "bg-gray-400/50 hover:scale-1010"
                      : "bg-black hover:scale-105",
                    "text-white rounded-lg text-sm py-[10px] px-[13px]  transition duration-200"
                  )}
                  onClick={handleSubmitReviewConcept}
                  disabled={isInvalid}
                >
                  {t("button.submit")}
                </button>
              </div>
            </div>
          )}
        </div>
      </ModalComponent>
      <div className="w-full h-[300px] relative ">
        <Image
          src={concept?.imageCover}
          alt={concept?.name}
          fill
          className="rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none"
          loading="lazy"
          onClick={handleClickConcept}
        />
        <button
          className="absolute bottom-4 right-4 text-white w-6 h-6"
          onClick={() => setIsOpenModalImageList(true)}
        >
          <Square2StackIcon className="text-white w-8 h-8" />
        </button>
      </div>
      <div
        className="p-4 flex flex-col justify-start items-start gap-2"
        onClick={handleClickConcept}
      >
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
            {concept?.reviews?.length} reviews
          </a>
        </div>
      </div>
      {isReviewBtn && (
        <div>
          <hr className="w-full bg-gray-300 h-[2px] !mt-0" />
          <div className="mb-4 flex mx-4">
            <button
              className="border border-black rounded-full py-[2px] px-3 text-xs font-normal hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-black"
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              Review
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-[10px] right-[10px] flex gap-3 z-10">
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
