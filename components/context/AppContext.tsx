import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";

interface AppContextProviderProps {
  children: ReactNode;
}
type ThemeMode = "light" | "dark" | undefined;
interface AppContextType {
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenDialog: boolean;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  accessToken: string;
}
const AppContext = createContext<AppContextType>({
  isOpenDialog: false,
  setIsOpenDialog: () => {},
  theme: "light",
  setTheme: () => {},
  accessToken: "",
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken") || ""
      : "";

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      } else {
        setTheme("light");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme as "light" | "dark");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }
  }, [theme]);
  return (
    <AppContext.Provider
      value={{ isOpenDialog, setIsOpenDialog, theme, setTheme, accessToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export { AppContextProvider, useAppContext };
