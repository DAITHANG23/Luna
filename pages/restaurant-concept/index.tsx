import { ConceptModel, ConceptsFilter } from "@/@types/models";
import React, { useMemo, useState } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Toolbar from "@/pages/restaurant-concept/components/Toolbar";
import { defaultFilter } from "@/contants";
import useGetAllConcepts from "@/features/hooks/ConceptsHooks/useGetAllConcepts";
import Skeleton from "./components/Skeleton";
import { sortBy } from "lodash";
import LazyConceptItem from "./components/LazyConceptItem";

const RestaurantConcept = () => {
  const [filter, setFilter] = useState(defaultFilter);

  const { t } = useTranslation(["translation", "concept"]);

  const { concepts, price, searchText, star } = filter;

  const handleFilterChange = (f: ConceptsFilter) => {
    setFilter(f as typeof filter);
  };

  const conceptsParams = useMemo(() => {
    if (concepts === "All") {
      return "";
    }
    return concepts;
  }, [concepts]);

  const priceParams = useMemo(() => {
    if (price === "All") return "";
    return price;
  }, [price]);

  const starParams = useMemo(() => {
    if (star === "All") return "";
    if (star === "3") return { gte: 3, lt: 3.5 };
    if (star === "4") return { gte: 3.5, lt: 4 };
    if (star === "5") return { gte: 4.5, lt: 5 };
  }, [star]);

  const params = useMemo(() => {
    return {
      type: conceptsParams,
      price: priceParams,
      searchText,
      avgRatings: starParams,
    };
  }, [conceptsParams, priceParams, searchText, starParams]);

  const { conceptsData, isLoading } = useGetAllConcepts(params);

  const conceptsDataSort = sortBy(conceptsData?.data.data, "name");

  return (
    <>
      <Head>
        <title>{t("headTitle.restaurantConcept")}</title>
      </Head>
      <div className="flex flex-col p-4 sm:p-8 mt-[5rem] sm:mt-[7.5rem]">
        <Toolbar onFilterChange={handleFilterChange} filter={filter} />

        <h3 className="text-primary-text">{`Domique Fusion: ${conceptsData?.results || 0} concepts`}</h3>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {conceptsDataSort && conceptsDataSort.length > 0 ? (
              <div className="py-8 grid grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center ">
                {conceptsDataSort?.map((concept: ConceptModel, index) => {
                  return (
                    <div key={concept.name}>
                      <LazyConceptItem concept={concept} index={index} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full text-center my-20">
                <p>{t("concept:notFound")}</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantConcept;
