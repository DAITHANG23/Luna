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
export const CONCEPTS_FAVORITE_KEY = "concepts-favorite";
export const GET_CONCEPTS_FAVORITE_KEY = "get-concepts-favorite";

export const COVER_IMAGES: Array<{ img: string; name: string }> = [
  { img: "/assets/images/cover-img-1.jpg", name: "cover-1-img" },
  { img: "/assets/images/cover-img-2.jpg", name: "cover-2-img" },
  { img: "/assets/images/cover-img-3.png", name: "cover-3-img" },
  { img: "/assets/images/cover-img-4.png", name: "cover-4-img" },
  { img: "/assets/images/cover-img-5.png", name: "cover-5-img" },
  { img: "/assets/images/cover-img-6.jpg", name: "cover-6-img" },
];

export const ABOUT_IMAGES: Array<{ img: string; name: string }> = [
  { img: "/assets/images/img-about-1.png", name: "img-about-1-img" },
  { img: "/assets/images/img-about-2.png", name: "img-about-2-img" },
  { img: "/assets/images/img-about-3.png", name: "img-about-3-img" },
  { img: "/assets/images/img-about-4.png", name: "img-about-4-img" },
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
