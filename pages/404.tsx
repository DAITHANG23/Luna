import NotFound from "@/libs/assets/NotFound";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  return (
    <div className="flex flex-col gap-[16px] justify-center items-center text-center my-[30px] sm:my-[8.5rem]">
      <NotFound />
      <h2 className="text-primary mt-[16px]">{t("notFound")}</h2>

      <button
        className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]"
        onClick={() => router.push("/")}
      >
        {t("returnHome")}
      </button>
    </div>
  );
};

export default NotFoundPage;
