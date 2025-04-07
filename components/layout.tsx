import { usePathname } from "next/navigation";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DialogSetting from "./Header/components/DialogSetting";
import { AppContextProvider } from "./contexts/AppContext";
import { useEffect } from "react";
import { accessToken, getAccountInfo } from "@/lib/redux/authSlice";
import TransSnackbarProvider from "./contexts/SnackbarContext";
import ScrollToTop from "./ScrollToTopButton/ScrollToTopButton";
import { useRouter } from "next/router";
import { getAllConcepts } from "@/lib/redux/masterDataSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

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

  useEffect(() => {
    dispatch(getAccountInfo());
  });

  useEffect(() => {
    if (accessTokenLoginWithGmail) {
      sessionStorage.setItem(
        "accessToken",
        accessTokenLoginWithGmail as string
      );
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
    const token = sessionStorage.getItem("accessToken") || "";
    dispatch(accessToken({ accessToken: token }));
    dispatch(getAllConcepts());
  }, [dispatch]);

  return (
    <AppContextProvider>
      <TransSnackbarProvider>
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
