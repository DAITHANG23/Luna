import SliderComponent from "@/share/components/SliderComponent";
import useGetDataUser from "./login/hooks/useGetDataUser";

export default function Home() {
  const { userData } = useGetDataUser();
  console.log(userData);
  return (
    <div className="w-full mt-[100px]">
      <SliderComponent />
    </div>
  );
}
