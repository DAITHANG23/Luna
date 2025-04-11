import { ConceptModel } from "@/@types/models/concept";
import Image from "next/image";
import React from "react";

interface ConceptItemProps {
  concept: ConceptModel;
}
const ConceptItem = ({ concept }: ConceptItemProps) => {
  return (
    <div className="h-[450px] flex flex-col border-2 border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-xl duration-300 transition-all ease-in-out dark:shadow-md dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] dark:transition-shadow dark:duration-300">
      <div className="w-full h-[300px] relative ">
        <Image
          src={`/assets/images/${concept.imageCover}.jpg`}
          alt={concept.name}
          fill
          className="rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none"
        />
      </div>
      <div className="p-4 flex flex-col justify-start items-start gap-2">
        <h3 className="text-primary-text">{concept.name}</h3>
        <p className="text-primary-text">{concept.type}</p>
        <p className="text-primary-text">{`${concept.address}`}</p>
        <p className="text-primary">{`${concept.totalRatings}`}</p>
      </div>
    </div>
  );
};

export default ConceptItem;
