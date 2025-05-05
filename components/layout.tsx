import { usePathname } from "next/navigation";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DialogSetting from "./Header/components/DialogSetting";
import { AppContextProvider } from "./contexts/AppContext";
import { useEffect } from "react";
import { accessToken } from "@/libs/redux/authSlice";
import TransSnackbarProvider from "./contexts/SnackbarContext";
import ScrollToTop from "./ScrollToTopButton/ScrollToTopButton";
import { useRouter } from "next/router";
import { getAllConcepts } from "@/libs/redux/masterDataSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAccountInfo } from "@/libs/redux/authSlice";
import AuthInitializer from "./AuthInitializer";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    accessToken: accessTokenLoginWithGmail,
    refreshToken: refreshTokenLoginWithGmail,
  } = router.query;
  const dispatch = useAppDispatch();
  const accessTokenState = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
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
  }, [accessTokenLoginWithGmail, refreshTokenLoginWithGmail, dispatch]);

  const isLoginPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    dispatch(getAllConcepts());
    if (accessTokenState) {
      dispatch(getAccountInfo());
    }
  }, [dispatch, accessTokenState]);

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
