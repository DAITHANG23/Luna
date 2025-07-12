import { ROUTES } from "@/contants";

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
  { name: "home", href: `${ROUTES.HOME.INDEX}` },
  { name: "about", href: `${ROUTES.ABOUT.INDEX}` },
  { name: "restaurantConcept", href: `${ROUTES.CONCEPTS.INDEX}` },
  { name: "blog", href: `${ROUTES.BLOG.INDEX}` },
];

export const conceptNavigation = [
  { name: "menu", href: "menu" },
  { name: "booking", href: "booking" },
];

export const dropdownList: Array<DropdownListType> = [
  { name: "yourProfile", href: `${ROUTES.PROFILE.INDEX}` },
  { name: "reservationHistory", href: `${ROUTES.BOOKING.INDEX}` },
  { name: "favorites", href: `${ROUTES.FAVORITE_CONCEPTS.INDEX}` },
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
