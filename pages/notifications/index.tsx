import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import NotificationMain from "./components/NotificationMain";
import SliderComponent from "@/libs/shared/components/SliderComponent";
import { ABOUT_IMAGES } from "@/contants";

const Index = () => {
  const { t } = useTranslation("translation");
  return (
    <>
      <Head>
        <title>{t("headTitle.notifications")}</title>
      </Head>
      <NotificationMain>
        <SliderComponent isSmallSize coverImages={ABOUT_IMAGES} />
      </NotificationMain>
    </>
  );
};

export default Index;
