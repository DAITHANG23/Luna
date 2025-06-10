import InformationRestaurants from "@/components/Home/InformationRestaurants";
import ConceptsList from "@/components/Home/ConceptsList";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { BANNER_IMAGES } from "@/contants";
import { SliderComponent } from "@/libs/shared/components";
const BusinessHighlights = dynamic(
  () => import("@/components/Home/BusinessHighlights"),
  {
    ssr: false,
  }
);
export default function Home() {
  const { t } = useTranslation("translation");
  return (
    <div className="mt-[4rem] sm:mt-[6rem]">
      <Head>
        <title>{t("headTitle.home")}</title>
        <meta
          name="description"
          content="Trang chủ của nhà hàng đặt bàn trực tuyến - Tìm kiếm và đặt bàn tại các nhà hàng yêu thích của bạn."
        />
      </Head>
      <SliderComponent coverImages={BANNER_IMAGES} />
      <BusinessHighlights />
      <InformationRestaurants />
      <ConceptsList />
    </div>
  );
}
