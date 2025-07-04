import { usePathname } from "next/navigation";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DialogSetting from "./Header/components/DialogSetting";
import { AppContextProvider } from "./contexts/AppContext";
import { useEffect } from "react";
import { accessToken, logout } from "@/libs/redux/authSlice";
import TransSnackbarProvider from "./contexts/SnackbarContext";
import ScrollToTop from "./ScrollToTopButton/ScrollToTopButton";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAccountInfo } from "@/libs/redux/authSlice";
import AuthInitializer from "./AuthInitializer";
import { isEmpty } from "lodash";
import { ROUTERS } from "@/contants";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const accessTokenState = useAppSelector((state) => state.auth.accessToken);
  const accountInfo = useAppSelector((state) => state.auth.accountInfo);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await fetch("/api/token", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data?.accessToken && data?.refreshToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          dispatch(accessToken({ accessToken: data.accessToken }));
          dispatch(getAllNotifications());
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        dispatch(logout());
      }
    };

    initAuth();
  }, [dispatch]);

  const isLoginPage =
    pathname === `${ROUTERS.LOGIN.INDEX}` ||
    pathname === `${ROUTERS.REGISTER.INDEX}`;

  useEffect(() => {
    if (accessTokenState && isEmpty(accountInfo)) {
      dispatch(getAccountInfo());
    }
  }, [dispatch, accessTokenState, accountInfo]);

  return (
    <AppContextProvider>
      <TransSnackbarProvider>
        <AuthInitializer />
        <Header />
        <main>
          <DialogSetting />
          <ScrollToTop />
          {children}
        </main>
        {!isLoginPage && <Footer />}
      </TransSnackbarProvider>
    </AppContextProvider>
  );
}
