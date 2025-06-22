import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import NotificationMain from "./components/NotificationMain";
import { ABOUT_IMAGES } from "@/contants";
import { SliderComponent } from "@/libs/shared/components";

const Index = () => {
  const { t } = useTranslation("translation");
  return (
    <>
      <Head>
        <title>{t("headTitle.notifications")}</title>
        <meta
          name="description"
          content="Trang thông báo quá trình diễn ra đặt bàn nhà hàng."
        />
      </Head>
      <NotificationMain>
        <SliderComponent isSmallSize coverImages={ABOUT_IMAGES} />
      </NotificationMain>
    </>
  );
};

export default Index;
