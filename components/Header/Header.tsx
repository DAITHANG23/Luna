import React from "react";
import Navbars from "./components/Navbars";
import { usePathname } from "next/navigation";
import NavbarsLogin from "./components/NavbarsLogin";
import { ROUTERS } from "@/contants";

const Header = () => {
  const pathname = usePathname();

  const isLoginPage =
    pathname === `${ROUTERS.LOGIN.INDEX}` ||
    pathname === `${ROUTERS.REGISTER.INDEX}` ||
    pathname?.includes(`${ROUTERS.RESET_PASSWORD.INDEX}`) ||
    pathname === `${ROUTERS.FORGOT_PASSWORD.INDEX}`;
  return (
    <div className="not-prose">
      {isLoginPage ? <NavbarsLogin /> : <Navbars />}
    </div>
  );
};

export default Header;
