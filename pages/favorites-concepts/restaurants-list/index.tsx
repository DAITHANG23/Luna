import useGetFavoriteConcepts from "@/hooks/ConceptsHooks/useGetFavoriteConcepts";
import { ConceptModel } from "@/@types/models/concept";
import ConceptItem from "@/pages/restaurant-concept/components/ConceptItem";
import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "@/public/icons/ArrowLeft";
import { useRouter } from "next/router";
import Skeleton from "@/pages/restaurant-concept/components/Skeleton";
const Favorites = () => {
  const { conceptsData, isLoading } = useGetFavoriteConcepts();
  const concepts = conceptsData?.data?.data || [];

  const router = useRouter();
  if (isLoading) return <Skeleton />;
  return (
    <div className="my-20 p-8">
      <div className="w-full lg:w-[60%] mx-auto mb-10">
        <button
          onClick={() => router.push("/favorites-concepts")}
          className="flex gap-2 items-center border border-solid rounded-lg border-black px-3 hover:bg-gray-200"
        >
          <ArrowLeft /> <span className="font-base">My lists</span>
        </button>
        <h4 className="pt-8">My Favorite List</h4>
        {concepts && concepts.length > 0 ? (
          <div className="py-8 grid grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 flex-wrap text-center justify-between items-center ">
            {concepts?.map((concept: ConceptModel) => {
              return (
                <div key={concept.name}>
                  <ConceptItem concept={concept} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full lg:w-[60%] mx-auto text-center">
            <h1>
              You have no favorites yet
              <br /> {`:(`}
            </h1>
            <div className="w-full h-[8.75rem] relative rounded-xl">
              <Image
                src={"/assets/images/favoriteRestaurant.gif"}
                alt="favorite-restaurant"
                fill
                objectFit="contain"
              />
            </div>
            <div>
              Touch the heart icon on any
              <Link href={"/restaurant-concept"} className="px-1">
                restaurant
              </Link>
              <br />
              and it will save them here as a favorite
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
