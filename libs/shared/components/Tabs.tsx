import clsx from "clsx";
import React, { JSX } from "react";
import { useTranslation } from "react-i18next";

interface TablistProps {
  tabList: Array<{ name: string; icon: JSX.Element }>;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

export const Tabs = ({ tabList, setActiveTab, activeTab }: TablistProps) => {
  const { t, ready } = useTranslation("profile");
  if (!ready) return null;
  return (
    <div className="border-gray-200 dark:border-gray-700 not-prose">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabList?.map((tab) => {
          return (
            <li
              key={tab.name}
              className="me-6"
              onClick={() => setActiveTab(tab.name)}
            >
              <p
                className={clsx(
                  "text-base inline-flex items-center justify-center pb-2 border-b-2 border-transparent rounded-t-lg hover:text-primary hover:border-primary group cursor-pointer",
                  "transition-all duration-300 ease-in-out",
                  activeTab === tab.name
                    ? "text-primary border-primary dark:text-primary dark:border-primary"
                    : ""
                )}
              >
                {tab.icon} <span className="ml-1">{t(tab.name)}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
