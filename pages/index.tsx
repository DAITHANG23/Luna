import SliderComponent from "@/share/components/SliderComponent";
import BusinessHighlights from "./components/BusinessHighlights";
import InformationRestaurants from "./components/InformationRestaurants";
import ConceptsList from "./components/ConceptsList";

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
