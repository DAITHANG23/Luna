import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en-GB",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      queryStringParams: { v: `${Date.now()}` },
    },
    ns: [
      "translate",
      "home",
      "restaurant",
      "booking",
      "profile",
      "notification",
    ],
    supportedLngs: ["en-GB", "vi-VN"],
    defaultNS: "translation",
    debug: false,
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br"],
    },
  });

export default i18n;
