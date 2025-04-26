import { ConceptModel } from "@/@types/models/concept";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import ModalCarousel from "@/share/components/ModalCarousel";
import { DEFAULT_CONCEPTS_LIST } from "@/contants";
interface ConceptItemProps {
  concept: ConceptModel;
}
const ConceptItem = ({ concept }: ConceptItemProps) => {
  const [isCheckedInConcept, setIsCheckedInConcept] = useState(false);
  const [isFavoriteConcept, setIsFavoriteConcept] = useState(false);
  const [isOpenModalImageList, setIsOpenModalImageList] = useState(false);

  const typeConcept = useMemo(() => {
    if (!concept.type) return "OTHER";
    return DEFAULT_CONCEPTS_LIST.find((i) => i.value === concept.type)?.label;
  }, [concept]);
  return (
    <div className="relative h-[450px] flex flex-col border-2 border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-xl duration-300 transition-all ease-in-out dark:shadow-md dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] dark:transition-shadow dark:duration-300">
      <ModalCarousel
        setOpen={setIsOpenModalImageList}
        open={isOpenModalImageList}
        imagesList={concept?.images}
      />
      <div className="w-full h-[300px] relative ">
        <Image
          src={`/assets/images/${concept?.imageCover}.jpg`}
          alt={concept?.name}
          fill
          className="rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none"
        />
        <button
          className="absolute bottom-4 right-4 text-white w-6 h-6"
          onClick={() => setIsOpenModalImageList(true)}
        >
          <Square2StackIcon className="text-white w-8 h-8" />
        </button>
      </div>
      <div className="p-4 flex flex-col justify-start items-start gap-2">
        <h3 className="text-primary-text">{concept?.name}</h3>
        <p className="text-primary-text">{typeConcept}</p>
        <p className="text-primary-text">{`${concept?.address}`}</p>
        <p className="text-primary">{`${concept?.avgRatings || 0}`}</p>
      </div>
      <div className="absolute top-[10px] right-[10px] flex gap-3">
        <button
          className="border-none bg-white rounded-full p-1 cursor-pointer"
          onClick={() => {
            setIsCheckedInConcept((prev) => !prev);
          }}
        >
          {isCheckedInConcept ? (
            <CheckCircleIconSolid className="text-green-500 w-5 h-5" />
          ) : (
            <CheckCircleIcon className="text-black w-5 h-5" />
          )}
        </button>
        <button
          className="border-none bg-white rounded-full p-1 cursor-pointer"
          onClick={() => {
            setIsFavoriteConcept((prev) => !prev);
          }}
        >
          <div className="w-5 h-5">
            {isFavoriteConcept ? (
              <HeartIconSolid className="text-primary w-full h-full" />
            ) : (
              <HeartIcon className="text-black w-full h-full" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ConceptItem;
