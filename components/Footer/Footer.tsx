"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, ready } = useTranslation("translation");

  if (!ready) return null;
  return (
    <div className="text-white grid grid-cols-1 text-center sm:grid-cols-3 w-full p-[50px] gap-[50px] bg-[#1C252E]">
      <div className="w-full sm:w-[200px] lg:w-[400px]">
        <h4 className="text-white">{t(`footer.title`)}</h4>
        <p className="text-secondary-text">{t(`footer.address`)}</p>
        <p className="text-secondary-text">{t(`footer.responsible`)}</p>
      </div>

      <div>
        <h4 className="text-white"> {t(`footer.customerSupport`)}</h4>
        <p className="text-secondary-text">{t(`footer.termsOfUse`)}</p>
        <p className="text-secondary-text">{t(`footer.membershipPolicy`)}</p>
        <p className="text-secondary-text">{t(`footer.privacyPolicy`)}</p>
      </div>

      <div>
        <h4 className="text-white">{`© ${currentYear} Domique Fushion.,JSC. All rights reserved`}</h4>
      </div>
    </div>
  );
};

export default Footer;
