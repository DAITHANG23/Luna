import { ConceptsFavoriteResponse, ReviewPost } from "@/@types/models";
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

  postReviewConcept: async ({
    formData,
  }: {
    formData: ReviewPost;
  }): Promise<ConceptsFavoriteResponse> => {
    return await apiRequest(`${baseURL}/review`, "POST", formData);
  },
};
export default concepts;
