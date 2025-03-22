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
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "restaurantConcept", href: "/restaurant-concept" },
  { name: "blog", href: "/blog" },
];

export const dropdownList: Array<DropdownListType> = [
  { name: "yourProfile", href: "/your-profile" },
  { name: "bookingHistory", href: "/order-history" },
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
