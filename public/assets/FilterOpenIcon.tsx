import Image from "next/image";
import FilterOpenImage from "./icons/filter-open.svg";

export const FilterOpenIcon = () => {
  return (
    <div className="relative">
      <Image alt="FilterOpenIcon" src={FilterOpenImage} />
    </div>
  );
};
