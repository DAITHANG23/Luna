import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const AuthorizePage = () => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  return (
    <div className="flex flex-col gap-[16px] justify-center items-center text-center my-[30px] sm:my-[70px]">
      <Image
        src={"/assets/images/401-error.jpg"}
        alt="not-found"
        width={500}
        height={300}
        className="rounded-lg shadow-lg"
      />
      <h2 className="text-primary mt-[16px]">{t("authorize")}</h2>

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
