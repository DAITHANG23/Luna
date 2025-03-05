import { RootState } from "@/lib/redux/store";
import SliderComponent from "@/share/components/SliderComponent";
import { useSelector } from "react-redux";

export default function Home() {
  const userInfo = useSelector((state: RootState) => state.auth.user);
  console.log("userinfo:", userInfo);
  return (
    <div className="w-full mt-[100px]">
      <SliderComponent />
    </div>
  );
}
