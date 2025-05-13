import NavbarConcept from "@/components/NavbarConcept/NavbarConcept";
import { usePathname } from "next/navigation";
import React from "react";

const Index = () => {
  const pathname = usePathname();
  return (
    <div className="mt-[7.25rem] w-[60%] mx-auto">
      <NavbarConcept pathname={pathname} />
    </div>
  );
};

export default Index;
