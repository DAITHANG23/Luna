import SliderComponent from "@/share/components/SliderComponent";
import InformationRestaurants from "@/components/Home/InformationRestaurants";
import ConceptsList from "@/components/Home/ConceptsList";
import dynamic from "next/dynamic";
const BusinessHighlights = dynamic(
  () => import("@/components/Home/BusinessHighlights"),
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <div>
      <SliderComponent />
      <BusinessHighlights />
      <InformationRestaurants />
      <ConceptsList />
    </div>
  );
}
