import SliderComponent from "@/share/components/SliderComponent";
import BusinessHighlights from "./components/BusinessHighlights";
import InformationRestaurants from "./components/InformationRestaurants";

export default function Home() {
  return (
    <div>
      <SliderComponent />
      <BusinessHighlights />
      <InformationRestaurants />
    </div>
  );
}
