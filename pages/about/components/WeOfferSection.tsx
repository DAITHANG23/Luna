import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { Award, Leaf, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const WE_OFFER_LIST: Array<{
  icon: React.ReactNode;
  title: string;
  content: string;
}> = [
  {
    icon: <Award className="h-5 w-5 text-primary" />,
    title: "offerTitle1",
    content: "contentOffer1",
  },
  {
    icon: <Leaf className="h-5 w-5 text-primary" />,
    title: "offerTitle2",
    content: "contentOffer2",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "offerTitle3",
    content: "contentOffer3",
  },
];

const WeOfferSection = () => {
  const ref = useRef(null);

  const { t, ready } = useTranslation(["home", "translation"]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.2 && !visible) {
      setVisible(true);
    }
  });

  if (!ready) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-semibold !mb-6 text-center text-primary">
        We Offer
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {WE_OFFER_LIST.map((item) => (
          <div
            key={item.title}
            className="bg-gradient-to-br rounded-lg from-card bg-card to-secondary/30 border border-primary/20 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 shadow-sm duration-300 transition-shadow"
          >
            <div className="flex items-center gap-2 p-6">
              {item.icon}
              <h3 className="text-primary ">{t(`about.${item.title}`)}</h3>
            </div>
            <p className="text-primary-text pt-0 p-6">
              {t(`about.${item.content}`)}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeOfferSection;
