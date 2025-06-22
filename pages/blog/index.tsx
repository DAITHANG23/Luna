import { Updating } from "@/libs/assets";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t, ready } = useTranslation("translation");
  const router = useRouter();
  if (!ready) return null;
  return (
    <>
      <Head>
        <title>{t("translation:headTitle.blog")}</title>
        <meta
          name="description"
          content="Trang các bài blog về chuỗi nhà hàng."
        />
      </Head>
      <div className="mt-[8.5rem] flex flex-col justify-center items-center gap-10">
        <Updating />
        <button
          className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]"
          onClick={() => router.push("/")}
        >
          {t("returnHome")}
        </button>
      </div>
      ;
    </>
  );
};

export default Index;
