import { AuthorizationImage } from "@/libs/assets";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const AuthorizePage = () => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center my-[5rem] sm:my-[8.5rem]">
      <AuthorizationImage />

      <h2 className="text-primary mt-4">{t("authorize")}</h2>

      <button
        className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]"
        onClick={() => router.push("/login")}
      >
        {t("returnLogin")}
      </button>
    </div>
  );
};

export default AuthorizePage;
