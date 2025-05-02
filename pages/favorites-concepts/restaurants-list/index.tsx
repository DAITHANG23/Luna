import useGetFavoriteConcepts from "@/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { ConceptModel } from "@/@types/models/concept";
import ConceptItem from "@/pages/restaurant-concept/components/ConceptItem";
import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "@/public/icons/ArrowLeft";
import { useRouter } from "next/router";
import Skeleton from "@/pages/restaurant-concept/components/Skeleton";
import { useTranslation } from "react-i18next";
const Favorites = () => {
  const { conceptsData, isLoading } = useGetFavoriteConcepts();
  const concepts = conceptsData?.data?.data || [];
  const { t } = useTranslation("concept");
  const router = useRouter();
  if (isLoading) return <Skeleton />;
  return (
    <div className="my-20 p-8">
      <div className="w-full lg:w-[60%] mx-auto mb-10">
        <button
          onClick={() => router.push("/favorites-concepts")}
          className="flex gap-2 items-center border border-solid rounded-lg border-black px-3 hover:bg-gray-200 mb-4"
        >
          <ArrowLeft /> <span className="font-base">{t("button.back")}</span>
        </button>
        {concepts?.length > 0 && <h4 className="pt-8">{t("title")}</h4>}
        {concepts && concepts.length > 0 ? (
          <div className="py-8 grid grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center">
            {concepts?.map((concept: ConceptModel) => {
              return (
                <div key={concept.name}>
                  <ConceptItem concept={concept} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full lg:w-[60%] mx-auto text-center">
            <h1>
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
            <div>
              {t("touchTheHeartIcon")}
              <Link href={"/restaurant-concept"} className="px-1">
                {t("restaurant")}
              </Link>
              <br />
              {t("andItWill")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
