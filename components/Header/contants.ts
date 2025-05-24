import { ROUTERS } from "@/contants";

interface DropdownListType {
  name: string;
  href: string;
}
interface LanguageListType {
  name: string;
  value: string;
  img: string;
}
export const navigation = [
  { name: "home", href: `${ROUTERS.HOME.INDEX}` },
  { name: "about", href: `${ROUTERS.ABOUT.INDEX}` },
  { name: "restaurantConcept", href: `${ROUTERS.CONCEPTS.INDEX}` },
  { name: "blog", href: `${ROUTERS.BLOG.INDEX}` },
];

export const conceptNavigation = [
  { name: "menu", href: "menu" },
  { name: "booking", href: "booking" },
];

export const dropdownList: Array<DropdownListType> = [
  { name: "yourProfile", href: `${ROUTERS.PROFILE.INDEX}` },
  { name: "bookingHistory", href: `${ROUTERS.BOOKING.INDEX}` },
  { name: "favorites", href: `${ROUTERS.FAVORITE_CONCEPTS.INDEX}` },
  { name: "Settings", href: "" },
];

export const languageList: Array<LanguageListType> = [
  {
    name: "vietnamese",
    value: "vi-VN",
    img: "https://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg",
  },
  {
    name: "english",
    value: "en-GB",
    img: "https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg",
  },
];
