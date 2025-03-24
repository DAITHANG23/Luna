import GeneralProfile from "@/public/icons/GeneralProfile";
import SecurityIcon from "@/public/icons/SecurityIcon";
import TabsComponent from "@/share/components/TabsComponent";
import React, { JSX, useEffect, useState } from "react";
import ProfileComponent from "./components/ProfileComponent";
import SecurityComponent from "./components/SecurityComponent";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/router";
const tabList: Array<{ name: string; icon: JSX.Element }> = [
  { name: "tabProfile", icon: <GeneralProfile /> },
  { name: "tabSecurity", icon: <SecurityIcon /> },
];

const YourProfile = () => {
  const router = useRouter();
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("accessToken");
      if (!token && !isAuth) {
        router.push("/401");
      }
    }
  }, [isAuth, router]);

  const [activeTab, setActiveTab] = useState(tabList[0].name);
  const { t, ready } = useTranslation("profile");
  if (!ready) return null;
  return (
    <div className="xl:w-[70%] w-[85%] flex flex-col justify-start m-auto my-5 sm:my-20">
      <h1 className="text-primary-text">{t("title")}</h1>
      <TabsComponent
        tabList={tabList}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="mt-10">
        {activeTab === "tabProfile" ? (
          <ProfileComponent />
        ) : (
          <SecurityComponent />
        )}
      </div>
    </div>
  );
};

export default YourProfile;
