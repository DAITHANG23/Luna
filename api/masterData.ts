import { AllConceptsResponse } from "@/@types/models/concept";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/features/hooks/useApiRequest";
import { buildQueryString } from "@/utils";

const baseURL = `${API_VERSION_V1}/concepts`;
const masterData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllConcepts: async (params?: any): Promise<AllConceptsResponse> => {
    const query = buildQueryString(params);
    return await apiRequest(`${baseURL}${query}`, "GET");
  },
};

export default masterData;
