import { UserResponse } from "@/@types/models/account";
import { FavoriteConcepts } from "@/@types/models/concept";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/users`;
const user = {
  favoriteConcepts: async ({
    formData,
  }: {
    formData: FavoriteConcepts;
  }): Promise<UserResponse> => {
    return await apiRequest(`${baseURL}/favorites`, "POST", formData);
  },

  deleteFavoriteConcept: async ({
    formData,
  }: {
    formData: FavoriteConcepts;
  }) => {
    return await apiRequest(
      `${baseURL}/deleteFavoriteConcept`,
      "DELETE",
      formData
    );
  },
};
export default user;
