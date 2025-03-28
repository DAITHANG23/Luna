import React from "react";
import Navbars from "./components/Navbars";
import { usePathname } from "next/navigation";
import NavbarsLogin from "./components/NavbarsLogin";

const Header = () => {
  const pathname = usePathname();

  const isLoginPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname?.includes("/reset-password") ||
    pathname === "/forgot-password";
  return (
    <div className="not-prose">
      {isLoginPage ? <NavbarsLogin /> : <Navbars />}
    </div>
  );
};

export default Header;
