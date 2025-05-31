import useBreakPoints from "@/features/hooks/useBreakPoints";
import { FilterIcon } from "@/libs/assets";
import { FilterOpenIcon } from "@/libs/assets";
import { cn } from "@/utils/css";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface WrapperFilterProps {
  children: React.ReactNode;
  classNameMenu?: string;
  isConfirmButton?: boolean;
  isHandleCloseMenu?: boolean;
}
const WrapperFilter = ({
  children,
  classNameMenu,
  isConfirmButton = false,
  isHandleCloseMenu = false,
}: WrapperFilterProps) => {
  const { isDesktopSize } = useBreakPoints();
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const { t, ready } = useTranslation();
  if (!ready || !hasMounted) return null;
  return isDesktopSize ? (
    <div className="py-5">{children}</div>
  ) : (
    <div className="w-full relative">
      <div
        className="border border-solid border-gray-500 p-3 mb-4 rounded-lg flex flex-row justify-between flex-nowrap cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <FilterOpenIcon /> : <FilterIcon />}
      </div>
      <div
        className={cn(
          classNameMenu,
          "absolute bg-white flex !flex-col justify-between flex-nowrap top-[150%] left-0 py-4 px-2 shadow-custom-blue rounded-lg block w-full translate-y-[-2em] transition-all duration-300 opacity-0",
          open && "visible opacity-100 translate-y-[0%] z-10 top-[100%] h-auto"
        )}
        onClick={() => {
          if (isHandleCloseMenu) handleCloseMenu();
        }}
      >
        {children}
        {isConfirmButton && (
          <button
            className="bg-primary text-base text-white px-4 py-2 w-full text-center mt-4 rounded-lg"
            onClick={() => {
              setOpen(false);
            }}
          >
            {t("button.confirm")}
          </button>
        )}
      </div>
    </div>
  );
};

export default WrapperFilter;
