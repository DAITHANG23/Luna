import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

export default function Home() {
  const userInfo = useSelector((state: RootState) => state.auth.accessToken);
  console.log("userinfo:", userInfo);
  return (
    <div className="w-full">
      <h1 className="text-primary">Hello world</h1>
      <h5 className="text-primary-text">I&apos;m Dom Nguyen</h5>
      <button className="p-2 bg-error/50 hover:bg-violet-600 text-white rounded-md">
        sign
      </button>
    </div>
  );
}
