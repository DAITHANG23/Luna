import SliderComponent from "@/share/components/SliderComponent";
import InformationRestaurants from "@/components/Home/InformationRestaurants";
import ConceptsList from "@/components/Home/ConceptsList";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { COVER_IMAGES } from "@/contants";
const BusinessHighlights = dynamic(
  () => import("@/components/Home/BusinessHighlights"),
  {
    ssr: false,
  }
);
export default function Home() {
  const { t } = useTranslation("translation");
  return (
    <div className="mt-20">
      <Head>
        <title>{t("headTitle.home")}</title>
      </Head>
      <SliderComponent coverImages={COVER_IMAGES} />
      <BusinessHighlights />
      <InformationRestaurants />
      <ConceptsList />
    </div>
  );
}
