import { usePathname } from "next/navigation";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DialogSetting from "./Header/components/DialogSetting";
import { AppContextProvider } from "./context/AppContext";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login" || pathname === "/register";
  return (
    <AppContextProvider>
      {!isLoginPage && <Header />}
      <main>
        <DialogSetting />
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </AppContextProvider>
  );
}
