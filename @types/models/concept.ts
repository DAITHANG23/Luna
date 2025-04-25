import { UserModel } from "./account";

export interface Dish {
  name: string;
  description: string;
  type: string;
  image: string;
  price: number;
}

export interface TimeSlotType {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface ConceptModel {
  name: string;
  description: string;
  address: string;
  conceptManager: UserModel;
  totalProfit: number;
  images: Array<string>;
  imageCover: string;
  timeSlot: TimeSlotType;
  dishes: Array<Dish>;
  type: string;
  avgRatings: number;
}

export interface AllConceptsResponse {
  data: { data: Array<ConceptModel> };
  status: string;
  results: number;
}

export interface IOptions {
  label: string;
  value: string;
}

export type ConceptsType =
  | "hotpot"
  | "other"
  | "japanese"
  | "bbq"
  | "steakHouse";
export type IConcepts = ConceptsType | "All";
export interface ConceptsFilter {
  searchText: string;
  concepts: IConcepts;
  price: string;
  star: string;
}
