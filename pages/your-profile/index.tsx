import GeneralProfile from "@/public/icons/GeneralProfile";
import SecurityIcon from "@/public/icons/SecurityIcon";
import TabsComponent from "@/share/components/TabsComponent";
import React, { JSX, useState } from "react";
import ProfileComponent from "./components/ProfileComponent";
import SecurityComponent from "./components/SecurityComponent";
const tabList: Array<{ name: string; icon: JSX.Element }> = [
  { name: "Profile", icon: <GeneralProfile /> },
  { name: "Security", icon: <SecurityIcon /> },
];
const YourProfile = () => {
  const [activeTab, setActiveTab] = useState(tabList[0].name);
  return (
    <div className="xl:w-[70%] w-[85%] flex flex-col justify-start m-auto my-20">
      <h1 className="text-primary-text">Profile</h1>
      <TabsComponent
        tabList={tabList}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="mt-10">
        {activeTab === "Profile" ? <ProfileComponent /> : <SecurityComponent />}
      </div>
    </div>
  );
};

export default YourProfile;
