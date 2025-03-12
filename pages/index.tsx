import SliderComponent from "@/share/components/SliderComponent";
import BusinessHighlights from "@/components/Home/BusinessHighlights";
import InformationRestaurants from "@/components/Home/InformationRestaurants";
import ConceptsList from "@/components/Home/ConceptsList";

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
