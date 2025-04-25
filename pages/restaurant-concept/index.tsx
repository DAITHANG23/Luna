import { ConceptModel, ConceptsFilter } from "@/@types/models/concept";
import { useAppSelector } from "@/lib/redux/hooks";
import React, { useMemo, useState } from "react";
import ConceptItem from "@/pages/restaurant-concept/components/ConceptItem";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Toolbar from "@/share/components/Toolbar";
import { defaultFilter } from "./contants";

const RestaurantConcept = () => {
  const [filter, setFilter] = useState(defaultFilter);
  const allConceptsResponse = useAppSelector(
    (state) => state.masterData.allConcepts
  );

  const { t } = useTranslation("translation");

  const conceptsData = useMemo(() => {
    if (!allConceptsResponse) return [];
    return allConceptsResponse.data.data;
  }, [allConceptsResponse]);

  const handleFilterChange = (f: ConceptsFilter) => {
    setFilter(f as typeof filter);
  };

  return (
    <>
      <Head>
        <title>{t("headTitle.restaurantConcept")}</title>
      </Head>
      <div className="flex flex-col p-4 sm:p-8 mt-[4rem]">
        <Toolbar onFilterChange={handleFilterChange} filter={filter} />
        <h3 className="text-primary-text">{`Domique Fusion: ${allConceptsResponse?.results || 0} concepts`}</h3>

        <div className="py-8 grid grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center ">
          {conceptsData &&
            conceptsData.map((concept: ConceptModel) => {
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
