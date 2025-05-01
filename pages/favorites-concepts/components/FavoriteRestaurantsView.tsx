import Image from "next/image";
import React from "react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ConceptModel } from "@/@types/models/concept";

interface FavoriteConceptsViewProps {
  data: Array<ConceptModel>;
}
const FavoriteConceptsView = ({ data }: FavoriteConceptsViewProps) => {
  const favoriteImages = data?.map((i) => i.imageCover);

  return (
    <div className="flex flex-col w-[21.75rem] !h-[19.7rem] shadow-glass border-none rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-105">
      <div className="flex text-center  w-full h-[3.3rem] p-4 gap-4 bg-white rounded-xl">
        <p>
          <HeartIconSolid className="text-primary w-full h-full" />
        </p>
        <p className="font-base font-normal">Restaurants I Love</p>
      </div>
      <div className="w-full h-[17rem] relative rounded-xl">
        {favoriteImages && favoriteImages.length >= 3 ? (
          <div className="w-full h-full flex">
            <div className="w-[70%] h-full relative">
              <Image
                src={`/assets/images/${favoriteImages[0]}.jpg`}
                alt="gogi"
                layout="fill"
                className="rounded-bl-xl"
                objectFit="cover"
              />
            </div>
            <div className="w-[30%] h-full">
              <div className="w-[full h-[50%] relative">
                <Image
                  src={`/assets/images/${favoriteImages[1]}.jpg`}
                  alt="gogi"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-full h-[50%] relative">
                <Image
                  src={`/assets/images/${favoriteImages[2]}.jpg`}
                  alt="gogi"
                  layout="fill"
                  className="rounded-br-xl"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={"/assets/images/gogi-dish1.jpg"}
            alt="gogi"
            layout="fill"
            className="rounded-br-xl rounded-bl-xl"
          />
        )}
      </div>
    </div>
  );
};

export default FavoriteConceptsView;
