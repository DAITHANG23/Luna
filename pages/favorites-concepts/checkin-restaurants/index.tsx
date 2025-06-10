import { ConceptModel } from "@/@types/models";
import ConceptItem from "@/pages/restaurant-concept/components/ConceptItem";
import Link from "next/link";
import { ArrowLeftIcon } from "@/libs/assets";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import useGetCheckInConcepts from "@/features/hooks/ConceptsHooks/useGetCheckInConcepts";
import Head from "next/head";
import { ROUTERS } from "@/contants";
import { Spinner } from "@/libs/shared/components";

const Visited = () => {
  const { t } = useTranslation(["concept", "translation"]);
  const router = useRouter();

  const { checkInConceptsData, isLoading: isLoadingCheckInConceptsData } =
    useGetCheckInConcepts();

  const checkInConcepts = checkInConceptsData?.data?.data || [];

  if (isLoadingCheckInConceptsData)
    return (
      <div className="mt-[8.5rem]">
        <Spinner />
      </div>
    );
  return (
    <>
      <Head>
        <title>{t("translation:headTitle.checkInRestaurants")}</title>
        <meta
          name="description"
          content="Trang nhà hàng khách hàng đã ghé thăm."
        />
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
          {checkInConcepts?.length > 0 && (
            <h4 className="pt-8 text-primary-text">{t("titleCheckIn")}</h4>
          )}
          {checkInConcepts && checkInConcepts.length > 0 ? (
            <div className="py-8 grid grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center">
              {checkInConcepts?.map((concept: ConceptModel) => {
                return (
                  <div key={concept.name}>
                    <ConceptItem concept={concept} isReviewBtn />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full lg:w-[60%] mx-auto text-center">
              <h1 className="text-primary-text">
                {t("checkinEmptyContent")}
                <br /> {`:(`}
              </h1>
              <div className="h-[8.75rem] w-full flex items-center justify-center rounded-xl">
                <CheckCircleIcon className="text-gray-400 w-20 h-20" />
              </div>
              <div className="text-primary-text">
                {t("touchTheVisitIcon")}
                <Link
                  href={"/restaurant-concept"}
                  className="px-1 dark:text-primary"
                >
                  {t("restaurant")}
                </Link>
                <br />
                {t("andItWillVisited")}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Visited;
