"use client";
import MoonIcon from "@/icons/MoonIcon";
import SunIcon from "@/icons/SunIcon";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SliderToggle {
  selected: "light" | "dark";
  setSelected: (value: "light" | "dark") => void;
}

const TOGGLE_CLASSES =
  "text-sm  font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const Toggles = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  typeof window !== "undefined" &&
    window.localStorage.setItem("theme", "light");
  const [selected, setSelected] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", selected);
      if (selected === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }
  }, [selected]);
  return (
    <div
      className={`grid h-[200px] place-content-center px-4 transition-colors ${
        selected === "light" ? "bg-white" : "bg-slate-900"
      }`}
    >
      <SliderToggle selected={selected} setSelected={setSelected} />
    </div>
  );
};

const SliderToggle = ({ selected, setSelected }: SliderToggle) => {
  return (
    <div className="relative flex w-fit items-center rounded-full not-prose">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("light");
        }}
      >
        <MoonIcon />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("dark");
        }}
      >
        <SunIcon />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default Toggles;
