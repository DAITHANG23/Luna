import { SecurityIcon, GeneralProfile } from "@/libs/assets";
import React, { JSX, useEffect, useMemo, useState } from "react";
import ProfileComponent from "./components/ProfileComponent";
import SecurityComponent from "./components/SecurityComponent";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/libs/redux/hooks";
import { RootState } from "@/libs/redux/store";
import { useRouter } from "next/router";
import Head from "next/head";
import useGetDataUser from "@/features/hooks/AccountHooks/useGetDataUser";
import { Tabs } from "@/libs/shared/components";
const tabList: Array<{ name: string; icon: JSX.Element }> = [
  { name: "tabProfile", icon: <GeneralProfile /> },
  { name: "tabSecurity", icon: <SecurityIcon /> },
];

const YourProfile = () => {
  const router = useRouter();
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { userData, isLoading } = useGetDataUser();
  const [activeTab, setActiveTab] = useState(tabList[0].name);
  const { t, ready } = useTranslation(["profile", "translation"]);

  const updateTablist = useMemo(() => {
    if (userData?.data.data.googleId) {
      return tabList.filter((i) => i.name !== "tabSecurity");
    }
    return tabList;
  }, [userData]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    if (!token && !isAuth && !userData?.data.data.avatarUrl) {
      router.push("/401");
    }
  }, [isAuth, router, userData]);

  if (!ready) return null;
  return (
    <>
      <Head>
        <title>{t("translation:headTitle.yourProfile")}</title>
        <meta
          name="description"
          content="Trang thông tin cá nhân khách hàng."
        />
      </Head>
      <div className="xl:w-[70%] w-[85%] flex flex-col justify-start mx-auto mb-[5rem] mt-[5rem] sm:mt-[7.5rem]">
        <h1 className="text-primary-text">{t("title")}</h1>
        <Tabs
          tabList={updateTablist}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <div className="mt-10">
          {activeTab === "tabProfile" ? (
            <ProfileComponent userData={userData} isLoading={isLoading} />
          ) : (
            <SecurityComponent />
          )}
        </div>
      </div>
    </>
  );
};

export default YourProfile;
