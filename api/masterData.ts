import { AllConceptsResponse } from "@/@types/models/concept";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/concepts`;
const masterData = {
  getAllConcepts: async (): Promise<AllConceptsResponse> => {
    return await apiRequest(`${baseURL}`, "GET");
  },
};

export default masterData;
