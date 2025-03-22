import { useAppContext } from "@/components/contexts/AppContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { languageList } from "../contants";
import { UK_FLAG, VN_FLAG } from "@/contants";
import i18n from "@/lib/i18n/i18n";
import { useTranslation } from "react-i18next";

const NavbarsLogin = () => {
  const { setIsOpenDialog } = useAppContext();
  const [langValue, setLangValue] = useState("en-GB");
  const { t } = useTranslation("translation");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const langGetStorage = localStorage.getItem("i18nextLng") || "";
      setLangValue(langGetStorage);
    }
  }, []);

  const onChangeLanguage = (lng: string) => {
    setLangValue(lng);

    i18n.changeLanguage(lng);
  };
  return (
    <div className="flex justify-between items-center p-4">
      <Link href={"/"}>
        <Image
          src={"/favicon.ico"}
          alt="logo"
          width={60}
          height={60}
          className="rounded-lg"
        />
      </Link>

      <div className="flex justify-center items-center">
        <Menu as="div" className="relative mx-3">
          <div>
            <MenuButton className="relative flex !rounded-md hover:ring-offset-primary/80 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Image
                src={langValue === "en-GB" ? UK_FLAG : VN_FLAG}
                alt={`${langValue}-img`}
                width={30}
                height={24}
                className="!rounded-[5px]"
              />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in "
          >
            {languageList.map((l) => {
              return (
                <MenuItem key={l.value}>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 "
                    onClick={() => onChangeLanguage(l.value)}
                  >
                    <div className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300">
                      <Image
                        src={l.img}
                        alt={l.name}
                        width={30}
                        height={24}
                        className="!rounded-[5px]"
                      />{" "}
                      <span className="text-base">{`${t(`settings.${l.name}`)}`}</span>
                    </div>
                  </button>
                </MenuItem>
              );
            })}
          </MenuItems>
        </Menu>

        <div className="relative group">
          <button
            className="cursor-pointer sm:mr-20 hover:bg-gray-200 rounded-full p-2"
            onClick={() => setIsOpenDialog((prev) => !prev)}
          >
            <Cog6ToothIcon className="w-7 h-7 animate-[spin_5s_linear_infinite] dark:text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarsLogin;
