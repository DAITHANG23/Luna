import Image from "next/image";
import FilterImage from "./icons/filter.svg";

export const FilterIcon = () => {
  return (
    <div className="relative">
      <Image alt="FilterIcon" src={FilterImage} />
    </div>
  );
};
