import useGetFavoriteConcepts from "@/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { useRouter } from "next/router";
import FavoriteConceptsView from "./components/FavoriteRestaurantsView";
import EmptyFavoriteRestaurant from "./components/EmptyFavoriteRestaurant";

const Favorites = () => {
  const { conceptsData } = useGetFavoriteConcepts();

  const dataConcepts = conceptsData?.data?.data || [];

  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 mt-[5rem] px-4 w-full lg:w-[60%] h-[100vh] text-center mx-auto">
      <hr className="w-full bg-gray-300 h-[2px]" />
      <div className="flex flex-col lg:flex-row gap-8 mx-auto lg:mx-0">
        <div
          onClick={() => {
            router.push("favorites-concepts/restaurants-list");
          }}
        >
          {dataConcepts && dataConcepts.length > 0 ? (
            <FavoriteConceptsView data={dataConcepts} />
          ) : (
            <EmptyFavoriteRestaurant />
          )}
        </div>
        <div>
          <FavoriteConceptsView data={dataConcepts} />
        </div>
      </div>
    </div>
  );
};

export default Favorites;
