import { usePathname } from "next/navigation";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DialogSetting from "./Header/components/DialogSetting";
import { AppContextProvider } from "./contexts/AppContext";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { accessToken } from "@/lib/redux/authSlice";
import TransSnackbarProvider from "./contexts/SnackbarContext";
import useGetDataUser from "@/hooks/AccountHooks/useGetDataUser";
import ScrollToTop from "./ScrollToTopButton/ScrollToTopButton";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isLoginPage = pathname === "/login" || pathname === "/register";
  const { userData } = useGetDataUser();
  console.log(userData);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken") || "";
    dispatch(accessToken({ accessToken: token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
