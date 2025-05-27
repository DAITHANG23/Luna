import { usePathname } from "next/navigation";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DialogSetting from "./Header/components/DialogSetting";
import { AppContextProvider } from "./contexts/AppContext";
import { useEffect } from "react";
import { accessToken } from "@/libs/redux/authSlice";
import TransSnackbarProvider from "./contexts/SnackbarContext";
import ScrollToTop from "./ScrollToTopButton/ScrollToTopButton";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAccountInfo } from "@/libs/redux/authSlice";
import AuthInitializer from "./AuthInitializer";
import { isEmpty } from "lodash";
import { ROUTERS } from "@/contants";
import socket from "@/features/notification/socket";
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
    socket.on("message", (msg) => {
      console.log("New message:", msg);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenLoginWithGmail = urlParams.get("accessToken");

    const refreshTokenLoginWithGmail = urlParams.get("refreshToken");
    if (accessTokenLoginWithGmail) {
      localStorage.setItem("accessToken", accessTokenLoginWithGmail as string);
      dispatch(
        accessToken({ accessToken: accessTokenLoginWithGmail as string })
      );
    }
    if (refreshTokenLoginWithGmail) {
      localStorage.setItem(
        "refreshToken",
        refreshTokenLoginWithGmail as string
      );
    }
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
