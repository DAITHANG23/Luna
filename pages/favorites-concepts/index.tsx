import useGetFavoriteConcepts from "@/features/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { useRouter } from "next/router";
import FavoriteConceptsView from "./components/FavoriteRestaurantsView";
import EmptyFavoriteRestaurant from "./components/EmptyFavoriteRestaurant";
import useGetCheckInConcepts from "@/features/hooks/ConceptsHooks/useGetCheckInConcepts";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { ROUTERS } from "@/contants";
import { Spinner } from "@/libs/shared/components";

const Favorites = () => {
  const { t } = useTranslation("translation");
  const { conceptsData, isLoading: isLoadingGetFavoriteConcepts } =
    useGetFavoriteConcepts();

  const { checkInConceptsData, isLoading: isLoadingGetCheckInConcepts } =
    useGetCheckInConcepts();

  const favoriteConceptsData = conceptsData?.data?.data || [];

  const checkInConcepts = checkInConceptsData?.data?.data || [];

  const router = useRouter();

  if (isLoadingGetCheckInConcepts || isLoadingGetFavoriteConcepts)
    return (
      <div className="mt-[8.5rem]">
        <Spinner />
      </div>
    );
  return (
    <>
      <Head>
        <title>{t("headTitle.favoriteConcepts")}</title>
      </Head>
      <div className="flex flex-col gap-4 mt-20 sm:mt-[10.5rem] mb-10 px-4 w-full lg:h-[100vh] sm:w-[60%] text-center mx-auto">
        <hr className="w-full bg-gray-300 h-[2px]" />
        <div className="flex flex-col lg:flex-row w-full gap-8 mx-auto lg:mx-0">
          <div
            onClick={() => {
              router.push(
                `${ROUTERS.FAVORITE_CONCEPTS.INDEX}/${ROUTERS.FAVORITE_CONCEPTS.FAVORITE_RESTAURANTS}`
              );
            }}
          >
            {favoriteConceptsData && favoriteConceptsData.length > 0 ? (
              <FavoriteConceptsView data={favoriteConceptsData} />
            ) : (
              <EmptyFavoriteRestaurant />
            )}
          </div>
          <div
            onClick={() => {
              router.push(
                `${ROUTERS.FAVORITE_CONCEPTS.INDEX}/${ROUTERS.FAVORITE_CONCEPTS.CHECKIN_RESTAURANTS}`
              );
            }}
          >
            {checkInConcepts && checkInConcepts.length > 0 ? (
              <FavoriteConceptsView data={checkInConcepts} isVisitedConcept />
            ) : (
              <EmptyFavoriteRestaurant isVisitedConcept />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
