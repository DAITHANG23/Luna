import { ConceptsFavoriteResponse } from "@/@types/models/concept";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/features/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/concepts`;
const concepts = {
  getFavoriteConcepts: async (): Promise<ConceptsFavoriteResponse> => {
    return await apiRequest(`${baseURL}/favoriteConcepts`, "GET");
  },

  getCheckInConcepts: async (): Promise<ConceptsFavoriteResponse> => {
    return await apiRequest(`${baseURL}/getCheckInConcepts`, "GET");
  },
};
export default concepts;
