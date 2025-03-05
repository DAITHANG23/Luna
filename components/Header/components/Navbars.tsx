import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  UserIcon,
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { dropdownList, navigation } from "@/components/Header/contants";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/components/contexts/AppContext";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { accessToken, logout } from "@/lib/redux/authSlice";

import { useAppDispatch } from "@/lib/redux/hooks";

const Navbars = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsOpenDialog } = useAppContext();
  const accessTokenState = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const [itemNavbar, setItemNavbar] = useState(pathname);
  const [fixedHeaderBackground, setFixedHeaderBackground] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleSroll = () => {
      if (window.scrollY && window.scrollY > 64) setFixedHeaderBackground(true);
      else setFixedHeaderBackground(false);
    };
    window.addEventListener("scroll", handleSroll);

    return () => {
      window.removeEventListener("scroll", handleSroll);
    };
  }, []);

  useEffect(() => {
    setItemNavbar(pathname);
  }, [pathname]);

  const handleSignOut = async () => {
    dispatch(accessToken({ accessToken: "" }));
    dispatch(logout());
  };

  return (
    <Disclosure
      as="nav"
      className={clsx(
        "fixed top-0 left-0 p-5 w-full",
        fixedHeaderBackground
          ? "bg-white/80 dark:bg-gray-800/80"
          : " bg-white dark:bg-gray-800"
      )}
    >
      <div className="sm:w-[90%] mx-auto max-w-7xl lg:px-8 content-center text-center">
        <div className="relative flex h-16 items-center justify-between al">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href={"/"}>
                <Image
                  alt="Your Company"
                  src="/favicon.ico"
                  height={80}
                  width={80}
                  className="rounded-lg sm:w-20 sm:h-20 w-12 h-12"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-20 sm:block content-center">
              <div className="flex space-x-4 ">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      itemNavbar === item.href
                        ? "bg-primary dark:bg-gray-900 text-white"
                        : "text-primary-text dark:text-gray-300 hover:bg-primary dark:hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium flex items-center justify-center"
                    )}
                    onClick={() => setItemNavbar(item.name)}
                  >
                    <p className="text-[16px]">{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full hover:bg-primary hover:text-white dark:bg-gray-800 p-1 text-primary-text dark:text-gray-400 dark:hover:text-primary-text  focus:ring-2 focus:ring-white focus:ring-offset-2  focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            {accessTokenState ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full hover:ring-offset-primary/80 bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                      width={32}
                      height={32}
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in "
                >
                  {dropdownList.map((item) => {
                    return (
                      <MenuItem key={item.name}>
                        <button
                          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                          onClick={() => {
                            if (item.name === "Settings") {
                              return setIsOpenDialog((prev) => !prev);
                            }
                          }}
                        >
                          {item.name !== "Settings" ? (
                            <Link
                              href={item.href}
                              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300"
                            >
                              {item.name === "Your Profile" ? (
                                <UserIcon className="w-5 h-5" />
                              ) : (
                                <ArchiveBoxIcon className="w-5 h-5" />
                              )}
                              <p className="prose">{item.name}</p>
                            </Link>
                          ) : (
                            <div className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300">
                              <Cog6ToothIcon className="w-5 h-5" />
                              <p className="prose">Settings</p>
                            </div>
                          )}
                        </button>
                      </MenuItem>
                    );
                  })}
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                      onClick={handleSignOut}
                    >
                      <div className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300">
                        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                        <p className="prose">Sign Out</p>
                      </div>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                onClick={() => router.replace("/login")}
                className="ml-2 border-none px-4 py-1 bg-primary rounded-lg text-white font-bold transition duration-300 ease-in-out hover:scale-105"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 flex items-center justify-center flex-col">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              className={clsx(
                itemNavbar === item.name
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium "
              )}
            >
              <Link
                href={item.href}
                onClick={() => setItemNavbar(item.name)}
                className="flex items-center justify-center"
              >
                {item.name}
              </Link>
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbars;
