import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ConceptItem from "./ConceptItem";
import { ConceptModel } from "@/@types/models";

interface LazyConceptItemProps {
  concept: ConceptModel;
  index: number;
}

const LazyConceptItem = ({ concept, index }: LazyConceptItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div ref={ref} className="mb-6 min-h-[150px]">
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ConceptItem concept={concept} />
        </motion.div>
      ) : (
        <div className="w-full h-[150px] bg-gray-100 animate-pulse rounded" />
      )}
    </div>
  );
};

export default LazyConceptItem;
