import { ConceptModel, ConceptsFilter } from "@/@types/models/concept";
import React, { useMemo, useState } from "react";
import ConceptItem from "@/pages/restaurant-concept/components/ConceptItem";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Toolbar from "@/pages/restaurant-concept/components/Toolbar";
import { defaultFilter } from "@/contants";
import useGetAllConcepts from "@/hooks/ConceptsHooks/useGetAllConcepts";

const RestaurantConcept = () => {
  const [filter, setFilter] = useState(defaultFilter);

  const { t } = useTranslation("translation");

  const { concepts, price, searchText, star } = filter;

  const handleFilterChange = (f: ConceptsFilter) => {
    setFilter(f as typeof filter);
  };

  const conceptsParams = useMemo(() => {
    if (concepts === "All") {
      return "all";
    }
    return concepts;
  }, [concepts]);

  const priceParams = useMemo(() => {
    if (price === "All") return { gte: 50000 };
    return price;
  }, [price]);

  const starParams = useMemo(() => {
    if (star === "All") return { gte: 3 };
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

  const { conceptsData } = useGetAllConcepts(params);

  return (
    <>
      <Head>
        <title>{t("headTitle.restaurantConcept")}</title>
      </Head>
      <div className="flex flex-col p-4 sm:p-8 mt-[4rem]">
        <Toolbar onFilterChange={handleFilterChange} filter={filter} />
        <h3 className="text-primary-text">{`Domique Fusion: ${conceptsData?.results || 0} concepts`}</h3>

        <div className="py-8 grid grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center ">
          {conceptsData &&
            conceptsData.data.data.map((concept: ConceptModel) => {
              return (
                <div key={concept.name}>
                  <ConceptItem concept={concept} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default RestaurantConcept;
