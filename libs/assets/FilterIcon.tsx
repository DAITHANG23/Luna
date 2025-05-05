import React from "react";
import FilterIconSvg from "../icons/filter.svg";
import Image from "next/image";
const FilterIcon = () => {
  return (
    <div className="w-6 h-6 relative">
      <Image src={FilterIconSvg} alt="FilterIcon" fill />
    </div>
  );
};

export default FilterIcon;
