import { useAppSelector } from "@/libs/redux/hooks";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { CONCEPTS_ROUTES } from "@/contants";
import Head from "next/head";
import NavbarConcept from "@/components/NavbarConcept/NavbarConcept";
import SliderComponent from "@/libs/shared/components/SliderComponent";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/libs/assets";
import ConceptsList from "@/components/Home/ConceptsList";
import { useTranslation } from "react-i18next";

const Index = () => {
  const router = useRouter();
  const { isReady, asPath } = router;
  const { t, ready } = useTranslation("concept");

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("routeConcept", asPath);
  }, [isReady, asPath]);

  const route = useMemo(() => {
    return CONCEPTS_ROUTES.find((c) => `/${c.route}` === asPath);
  }, [asPath]);

  useEffect(() => {
    const routeConcept = localStorage.getItem("routeConcept")?.trim() || "";

    const routeItem = CONCEPTS_ROUTES.some(
      (c) => `/${c.route}` === routeConcept
    );

    if (!routeItem) {
      router.push("/404");
    }
  }, [router, route]);

  const allConcepts = useAppSelector((state) => state.masterData.allConcepts)
    ?.data.data;

  const concept = allConcepts?.find((item) => item.name === route?.name);

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>Domique Fusion | {concept?.name}</title>
      </Head>
      <div className="mt-[7.25rem] px-4 w-full w-[90%] xl:w-[70%] mx-auto">
        <NavbarConcept pathname={asPath} />
        <SliderComponent banners={concept?.banners || []} />
        <div className="lg:pt-10 lg:pt-[100px] lg:pb-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-10 justify-start items-start">
            <h3 className="text-primary-text">{concept?.title}</h3>
            <div className="text-primary-text">
              {concept?.description}
              <div className="pt-4">
                <Link
                  href={{
                    pathname: `/[concept]/[navbar]`,
                    query: {
                      concept: route?.route,
                      navbar: "menu",
                    },
                  }}
                  className="flex gap-4 items-center hover:underline font-normal text-primary"
                >
                  {t("seeMenu")}
                  <div>
                    <ArrowRightIcon />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[300px] relative">
            <Image
              src={concept?.imageCover || "/assets/images/not-found.png"}
              alt="img-cover"
              fill
            />
          </div>
        </div>

        <div className="pt-4 lg:pt-10 pb-20">
          <ConceptsList isBannerWidth />
        </div>
      </div>
    </>
  );
};

export default Index;
