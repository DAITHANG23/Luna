import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const Booking = () => {
  const { t, ready } = useTranslation("translation");

  if (!ready) return null;
  return (
    <div>
      <Head>
        <title>{t("headTitle.bookingRestaurant")}dsadasdsa</title>
      </Head>
    </div>
  );
};

export default Booking;
