import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const OrderHistory = () => {
  const { t, ready } = useTranslation("translation");

  if (!ready) return null;
  return (
    <div>
      <Head>
        <title>{t("translation:headTitle.historyBooking")}</title>
      </Head>
      <div className="mt-[8.5rem]">History booking</div>
    </div>
  );
};

export default OrderHistory;
