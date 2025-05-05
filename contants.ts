import { ConceptsFilter } from "@/@types/models/concept";
export const REGEX_VALIDATE_EMAIL =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const REGEX_VALIDTATE_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const API_VERSION_V1 = "/api/v1";
export const DEFAULT_AVATAR = "/assets/images/defaultAvatar.jpg";
export const UK_FLAG =
  "https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg";
export const VN_FLAG =
  "https://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg";

export const ACCOUNT_LOGIN_QUERY_KEY = "account-login";
export const ACCOUNT_REGISTER_QUERY_KEY = "account-register";
export const GET_DATA_USER_QUERY_KEY = "get-data-user";
export const FORGOT_PASSWORD_QUERY_KEY = "forgot-password";
export const CREATE_NEW_PASSWORD_QUERY_KEY = "create-new-password";
export const RESEND_OTP_CODE = "resend-otp-code";
export const GET_ALL_CONCEPTS_QUERY_KEY = "get-all-concepts";
export const CONCEPTS_FAVORITE_KEY = "favorite-concepts";
export const GET_CONCEPTS_FAVORITE_KEY = "get-favorite-concepts";
export const GET_CHECK_IN_CONCEPTS_KEY = "get-checkin-concepts";
export const CHECK_IN_FAVORITE_CONCEPTS_KEY = "checkin-favorite-concepts";
export const DELETE_CHECK_IN_FAVORITE_CONCEPTS_KEY =
  "checkin-concepts-favorite";

export const ABOUT_IMAGES: Array<{ img: string; name: string }> = [
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746421646/img-about-2_juc80m.png",
    name: "img-about-1-img",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746421646/img-about-4_swbpzr.png",
    name: "img-about-2-img",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746421645/img-about-1_cscjnx.png",
    name: "img-about-3-img",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746421645/img-about-3_rxl9tl.png",
    name: "img-about-4-img",
  },
];

export const defaultFilter: ConceptsFilter = {
  searchText: "",
  concepts: "All",
  price: "All",
  star: "All",
};

export const DEFAULT_CONCEPTS_LIST: Array<{ label: string; value: string }> = [
  { label: "OTHER", value: "other" },
  { label: "JAPANESE", value: "japanese" },
  { label: "BBQ", value: "bbq" },
  { label: "STEAK HOUSE", value: "steakhouse" },
  { label: "HOT POT", value: "hotpot" },
];

export const BANNER_IMAGES: Array<{ img: string; name: string }> = [
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746351190/banners/cover-img-4_eepkyd.png",
    name: "Manwah",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746351190/banners/cover-img-5_l6u3h3.png",
    name: "isushi",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746351190/banners/cover-img-3_jzid5f.png",
    name: "Gogi",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746351190/banners/cover-img-2_u1s4as.jpg",
    name: "Bluebay",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746351189/banners/cover-img-1_fq9ytv.jpg",
    name: "Yakiniku",
  },
  {
    img: "https://res.cloudinary.com/dn797d3j3/image/upload/v1746351189/banners/cover-img-6_asfq1l.jpg",
    name: "Kichi-kichi",
  },
];
