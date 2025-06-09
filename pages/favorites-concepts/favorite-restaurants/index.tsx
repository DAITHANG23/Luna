import useGetFavoriteConcepts from "@/features/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { ConceptModel } from "@/@types/models";
import ConceptItem from "@/pages/restaurant-concept/components/ConceptItem";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@/libs/assets";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { ROUTERS } from "@/contants";
import { Spinner } from "@/libs/shared/components";

const Favorites = () => {
  const { t } = useTranslation(["concept", "translation"]);
  const router = useRouter();
  const { conceptsData, isLoading: isLoadingFavoriteConceptsData } =
    useGetFavoriteConcepts();

  const favoriteconcepts = conceptsData?.data?.data || [];

  if (isLoadingFavoriteConceptsData)
    return (
      <div className="mt-[8.5rem]">
        <Spinner />
      </div>
    );
  return (
    <>
      <Head>
        <title>{t("translation:headTitle.favoriteRestaurants")}</title>
      </Head>
      <div className="my-20 sm:my-[6.5rem] p-8">
        <div className="w-full lg:w-[80%] mx-auto mb-10">
          <button
            onClick={() => router.push(`${ROUTERS.FAVORITE_CONCEPTS.INDEX}`)}
            className="flex gap-2 items-center border border-solid dark:border-white rounded-lg border-black px-3 hover:bg-gray-200 mb-4"
          >
            <ArrowLeftIcon />
            <span className="font-base text-primary-text dark:hover:text-black">
              {t("button.back")}
            </span>
          </button>
          {favoriteconcepts?.length > 0 && (
            <h4 className="pt-8 text-primary-text">{t("title")}</h4>
          )}
          {favoriteconcepts && favoriteconcepts.length > 0 ? (
            <div className="py-8 grid grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center">
              {favoriteconcepts?.map((concept: ConceptModel) => {
                return (
                  <div key={concept.name}>
                    <ConceptItem concept={concept} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full lg:w-[60%] mx-auto text-center">
              <h1 className="text-primary-text">
                {t("emptyContent")}
                <br /> {`:(`}
              </h1>
              <div className="w-full h-[8.75rem] relative rounded-xl">
                <Image
                  src={"/assets/images/favoriteRestaurant.gif"}
                  alt="favorite-restaurant"
                  fill
                  objectFit="contain"
                />
              </div>
              <div className="dark:text-white">
                {t("touchTheHeartIcon")}
                <Link
                  href={"/restaurant-concept"}
                  className="px-1 dark:text-primary"
                >
                  {t("restaurant")}
                </Link>
                <br />
                {t("andItWill")}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
