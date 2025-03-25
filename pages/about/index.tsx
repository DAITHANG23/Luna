import { ABOUT_IMAGES } from "@/contants";
import SliderComponent from "@/share/components/SliderComponent";
import {
  Utensils,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Users,
  Leaf,
  Facebook,
  Github,
  Linkedin,
} from "lucide-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const WE_OFFER_LIST: Array<{
  icon: React.ReactNode;
  title: string;
  content: string;
}> = [
  {
    icon: <Award className="h-5 w-5 text-primary" />,
    title: "offerTitle1",
    content: "contentOffer1",
  },
  {
    icon: <Leaf className="h-5 w-5 text-primary" />,
    title: "offerTitle2",
    content: "contentOffer2",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "offerTitle3",
    content: "contentOffer3",
  },
];

const MapComponent = dynamic(() => import("@/share/components/MapComponent"), {
  ssr: false, // Tắt SSR
});

const About = () => {
  const { t, ready } = useTranslation(["home", "translation"]);
  if (!ready) return null;
  return (
    <div>
      <Head>
        <title>{t("translation:headTitle.about")}</title>
      </Head>
      <div className="max-w-full pt-0 p-4 sm:p-0 sm:max-w-[70%] mx-auto mt-12">
        <div className="mb-10 text-center bg-gradient-to-r from-primary/10 via-secondary/20 to-primary/10 py-8 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            {t("about.title")}
          </h1>
          <p className="text-primary-text text-base sm:text-xl text-center text-muted-foreground max-w-full sm:max-w-[65%] !mx-auto px-4">
            {t("about.content")}
          </p>
        </div>
        <SliderComponent isSmallSize coverImages={ABOUT_IMAGES} />
        <div className="mb-12 bg-gradient-to-r from-secondary/40 via-transparent to-secondary/40 p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-8 text-center text-primary">
            {t("about.ourStory")}
          </h2>
          <div className="text-primary-text space-y-6 text-lg leading-relaxed">
            <p>{t("about.contentStory")}</p>
            <p>{t("about.contentStory1")}</p>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-3xl font-semibold mb-8 text-center text-primary">
            {t("about.weOffer")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {WE_OFFER_LIST.map((item) => {
              return (
                <div
                  key={item.title}
                  className="bg-gradient-to-br rounded-lg from-card bg-card to-secondary/30 border border-primary/20 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 shadow-sm duration-300 transition-shadow"
                >
                  <div className="flex items-center gap-2 p-6">
                    {" "}
                    {item.icon}{" "}
                    <h3 className="text-primary ">
                      {t(`about.${item.title}`)}
                    </h3>
                  </div>
                  <p className="text-primary-text pt-0 p-6">
                    {t(`about.${item.content}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-12 bg-primary/30 shrink-0 h-[1px]"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 items-start">
          <div className="bg-gradient-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />{" "}
                {t("about.ourCuisine")}
              </h3>
            </div>

            <p className="text-primary-text pt-0 !px-6 pb-2">
              {t("about.contentOurCuisine")}
            </p>
            <ul className="text-primary-text mt-4 space-y-2 px-6 list-disc list-inside">
              <li>{t("about.cuisine1")}</li>
              <li>{t("about.cuisine2")}</li>
              <li>{t("about.cuisine3")}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> {t("about.openHour")}
              </h3>
            </div>

            <div className="text-primary-text p-6 flex flex-col gap-4">
              <p>
                <span className="font-bold">{t("about.monFri")}:</span> 11:00 -
                22:00
              </p>
              <p>
                <span className="font-bold">{t("about.satSun")}:</span> 10:00 -
                23:00
              </p>
              <p>
                <span className="font-bold">{t("about.holidays")}:</span>{" "}
                {t("about.specialHour")}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />{" "}
                {t("about.location")}
              </h3>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <MapComponent />
            </div>
          </div>

          <div className="bg-gradient-to-br from-card rounded-lg to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors shadow-md">
            <div className="bg-primary/5 rounded-t-lg p-6">
              <h3 className="text-primary flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" /> {t("about.contact")}
              </h3>
            </div>

            <div className="text-primary-text p-6 flex flex-col gap-4 break-all">
              <p className="flex gap-2">
                <span className="font-bold">
                  <Mail />
                </span>{" "}
                Nguyendaithang23061997@gmail.com
              </p>
              <p className="flex gap-2">
                <span className="font-bold">
                  <Phone />
                </span>{" "}
                +(84) 0772757220
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-0 p-6">
              <a
                href="#"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-primary" />
              </a>
              <a
                href="#"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Linkedin size={18} className="text-primary" />
              </a>
              <a
                href="#"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Twitter"
              >
                <Github size={18} className="text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="my-12 text-center bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 p-8 rounded-xl shadow-lg">
          <h2 className="text-primary text-2xl font-semibold mb-4">
            {t("about.visitUs")}
          </h2>
          <p className="text-primary-text text-lg">
            {t("about.lookingForward")}
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="bg-primary text-white no-underline text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors hover:shadow-lg"
            >
              {t("about.reservation")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
