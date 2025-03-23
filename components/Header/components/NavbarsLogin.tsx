import { useAppContext } from "@/components/contexts/AppContext";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LanguageSelect from "@/share/components/LanguageSelect";

const NavbarsLogin = () => {
  const { setIsOpenDialog } = useAppContext();

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
        <LanguageSelect />

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
