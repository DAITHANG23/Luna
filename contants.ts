import { ConceptsFilter, RestaurantsConceptType } from "@/@types/models";
import { IRoute } from "./@types/models";
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
export const REVIEW_CONCEPT_KEY = "review-concept";
export const GET_CONCEPT_KEY = "get-concept";
export const GET_RESTAURANTS_OF_CONCEPT_KEY = "get-restaurant-of-concept";

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

export const CONCEPTS_ROUTES: Array<IRoute> = [
  {
    name: "Manwah",
    route: "manwah",
    logo: "/assets/images/manwah-02.png",
    width: 55,
    height: 55,
  },
  {
    name: "Cloudpot",
    route: "cloudpot",
    logo: "/assets/images/cloudpot-1.png",
    width: 80,
    height: 55,
  },
  {
    name: "Isushi",
    route: "isushi",
    logo: "/assets/images/isushi-2.png",
    width: 65,
    height: 55,
  },
  {
    name: "Daruma",
    route: "daruma",
    logo: "/assets/images/daruma-2.png",
    width: 55,
    height: 55,
  },
  {
    name: "Phongon37",
    route: "phongon37",
    logo: "/assets/images/phongon_37_2.png",
    width: 55,
    height: 55,
  },
  {
    name: "Woomaster",
    route: "woomaster",
    logo: "/assets/images/woomaster1.png",
    width: 72,
    height: 55,
  },
  {
    name: "Gogi",
    route: "gogi",
    logo: "/assets/images/gogi1.png",
    width: 55,
    height: 55,
  },
  {
    name: "Crystal Jade",
    route: "crystal-jade",
    logo: "/assets/images/crystal-2.png",
    width: 80,
    height: 55,
  },
  {
    name: "Kpub",
    route: "kpub",
    logo: "/assets/images/kpub-02.jpg",
    width: 55,
    height: 55,
  },
  {
    name: "Kichi-Kichi",
    route: "kichi-kichi",
    logo: "/assets/images/kichi-02.png",
    width: 134,
    height: 55,
  },
  {
    name: "Sumo Yakiniku",
    route: "sumo-yakiniku",
    logo: "/assets/images/sumo1.png",
    width: 55,
    height: 55,
  },
  {
    name: "Shogun",
    route: "shogun",
    logo: "/assets/images/shogun-2.png",
    width: 65,
    height: 55,
  },
  {
    name: "Hutong",
    route: "hutong",
    logo: "/assets/images/hutong-02.png",
    width: 134,
    height: 55,
  },
  {
    name: "Hàng cuốn",
    route: "hang-cuon",
    logo: "/assets/images/hangcuon1.png",
    width: 134,
    height: 55,
  },
];

export const RESTAURANTS_CONCEPT = [
  {
    type: "HOTPOT",
    items: [
      {
        name: "Kichi-Kichi",
        img1: "/assets/images/kichi-01.png",
        img2: "/assets/images/kichi-02.png",
        url: "/kichi-kichi",
        width: 134,
        height: 55,
      },
      {
        name: "Hutong",
        img1: "/assets/images/hutong-01.png",
        img2: "/assets/images/hutong-02.png",
        url: "/hutong",
        width: 134,
        height: 55,
      },
      {
        name: "Manwah",
        img1: "/assets/images/manwah-01.png",
        img2: "/assets/images/manwah-02.png",
        url: "/manwah",
        width: 55,
        height: 55,
      },
    ],
  },
  {
    type: "BBQ",
    items: [
      {
        name: "Kpub",
        img1: "/assets/images/kpub-01.jpg",
        img2: "/assets/images/kpub-02.jpg",
        url: "/kpub",
        width: 55,
        height: 55,
      },
      {
        name: "Gogi",
        img1: "/assets/images/gogi2.png",
        img2: "/assets/images/gogi1.png",
        url: "/gogi",
        width: 55,
        height: 55,
      },
      {
        name: "Sumo Yakiniku",
        img1: "/assets/images/sumo2.png",
        img2: "/assets/images/sumo1.png",
        url: "/sumo-yakiniku",
        width: 55,
        height: 55,
      },
    ],
  },
  {
    type: "JAPANESE",
    items: [
      {
        name: "ISuShi",
        img1: "/assets/images/isushi-1.png",
        img2: "/assets/images/isushi-2.png",
        url: "/isushi",
        width: 65,
        height: 55,
      },
      {
        name: "Daruma",
        img1: "/assets/images/daruma-1.png",
        img2: "/assets/images/daruma-2.png",
        url: "/daruma",
        width: 55,
        height: 55,
      },
      {
        name: "Shogun",
        img1: "/assets/images/shogun-1.png",
        img2: "/assets/images/shogun-2.png",
        url: "/shogun",
        width: 65,
        height: 55,
      },
    ],
  },
  {
    type: "STEAK HOUSE",
    items: [
      {
        name: "Woomaster",
        img1: "/assets/images/woomaster2.png",
        img2: "/assets/images/woomaster1.png",
        url: "/woomaster",
        width: 72,
        height: 55,
      },
    ],
  },
  {
    type: "OTHER",
    items: [
      {
        name: "Phongon37",
        img1: "/assets/images/phongon_37_1.png",
        img2: "/assets/images/phongon_37_2.png",
        url: "/phongon37",
        width: 55,
        height: 55,
      },
      {
        name: "Cloudpot",
        img1: "/assets/images/cloudpot-2.png",
        img2: "/assets/images/cloudpot-1.png",
        url: "/cloudpot",
        width: 80,
        height: 55,
      },
      {
        name: "Crystal Jade",
        img1: "/assets/images/crystal-1.png",
        img2: "/assets/images/crystal-2.png",
        url: "/crystal-jade",
        width: 80,
        height: 55,
      },
      {
        name: "Hang cuon",
        img1: "/assets/images/hangcuon2.png",
        img2: "/assets/images/hangcuon1.png",
        url: "/hang-cuon",
        width: 200,
        height: 55,
      },
    ],
  },
] as Array<RestaurantsConceptType>;
