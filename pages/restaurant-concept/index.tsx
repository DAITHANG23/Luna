import { ConceptModel } from "@/@types/models/concept";
import { useAppSelector } from "@/lib/redux/hooks";
import React, { useMemo } from "react";
import ConceptItem from "./components/ConceptItem";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const RestaurantConcept = () => {
  const allConceptsResponse = useAppSelector(
    (state) => state.masterData.allConcepts
  );

  const { t } = useTranslation("translation");

  const conceptsData = useMemo(() => {
    if (!allConceptsResponse) return [];
    return allConceptsResponse.data.data;
  }, [allConceptsResponse]);

  return (
    <>
      <Head>
        <title>{t("headTitle.restaurantConcept")}</title>
      </Head>
      <div className="flex flex-col p-8">
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
