import useGetFavoriteConcepts from "@/features/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { useRouter } from "next/router";
import FavoriteConceptsView from "./components/FavoriteRestaurantsView";
import EmptyFavoriteRestaurant from "./components/EmptyFavoriteRestaurant";
import Skeleton from "../restaurant-concept/components/Skeleton";

const Favorites = () => {
  const { conceptsData, isLoading } = useGetFavoriteConcepts();

  const dataConcepts = conceptsData?.data?.data || [];

  const router = useRouter();

  if (isLoading) return <Skeleton />;
  return (
    <div className="flex flex-col gap-4 mt-20 sm:mt-[10.5rem] mb-10 px-4 w-full lg:h-[100vh] sm:w-[60%] text-center mx-auto">
      <hr className="w-full bg-gray-300 h-[2px]" />
      <div className="flex flex-col lg:flex-row w-full gap-8 mx-auto lg:mx-0">
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
