import { Dish } from "@/@types/models";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import _ from "lodash";
import { cn } from "@/utils";
import Image from "next/image";
import SliderComponent from "@/libs/shared/components/SliderComponent";

interface MenuProps {
  dishes: Array<Dish>;
}

const Menu = ({ dishes }: MenuProps) => {
  const alacarteDishes = useMemo(() => {
    return dishes?.filter((d) => d.type === "alacarte");
  }, [dishes]);

  const buffetDishes = useMemo(() => {
    return dishes?.filter((d) => d.type === "Buffet");
  }, [dishes]);

  const comboDishes = useMemo(() => {
    return dishes?.filter((d) => d.type === "Combo");
  }, [dishes]);

  const [openSideBar, setOpenSideBar] = useState<number | null>(0);
  const [chooseItemDishes, setChooseItemDishes] = useState<string | null>(null);
  useEffect(() => {
    setChooseItemDishes(
      alacarteDishes[0]?.category ||
        buffetDishes[0]?.name ||
        comboDishes[0]?.name ||
        ""
    );
  }, [alacarteDishes, buffetDishes, comboDishes]);

  const dishesList = useMemo(() => {
    const selectedDish =
      dishes &&
      dishes.find(
        (d) => d.category === chooseItemDishes || d.name === chooseItemDishes
      );

    return selectedDish?.items && selectedDish?.items?.length > 0
      ? selectedDish?.items
      : selectedDish;
  }, [dishes, chooseItemDishes]);

  const onToggleSidebar = (index: number, dishes: Array<Dish>) => {
    setOpenSideBar(index);
    setChooseItemDishes(dishes[0]?.name || dishes[0]?.category || "");
  };

  const onChooseItem = (value: string) => {
    setChooseItemDishes(value);
  };
  const navItem = [
    { type: "Alacarte", dishes: alacarteDishes },
    { type: "Buffet", dishes: buffetDishes },
    { type: "Combo", dishes: comboDishes },
  ];
  return (
    <div className="flex pr-2 pb-[3.125rem]">
      <div className="w-[20%]">
        {navItem.map(({ type, dishes }, index) => {
          return (
            dishes &&
            dishes.length > 0 && (
              <div className="pt-2" key={index}>
                <div
                  className={cn(
                    openSideBar === index
                      ? "border-primary text-primary"
                      : " text-primary-text",
                    "border-b-2 flex justify-between  cursor-pointer py-3 items-center text-lg font-bold"
                  )}
                  onClick={() => onToggleSidebar(index, dishes)}
                >
                  {_.capitalize(type)}
                  <span>
                    {openSideBar === index ? <ChevronDown /> : <ChevronRight />}
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSideBar === index
                      ? "opacity-100 !h-auto p-4"
                      : "opacity-0 max-h-0 p-0"
                  }`}
                >
                  {dishes?.map((item) => {
                    const itemDishes =
                      (item.type === "alacarte" ? item.category : item.name) ||
                      "";
                    return (
                      <div
                        key={itemDishes}
                        className={cn(
                          chooseItemDishes === itemDishes
                            ? "text-primary"
                            : "text-primary-text",
                          "p-2 cursor-pointer font-bold hover:text-primary text-base"
                        )}
                        onClick={() => onChooseItem(itemDishes)}
                      >
                        {item.type === "alacarte" ? item.category : item.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          );
        })}
      </div>
      <div className="w-[80%] pl-[5rem] gap-4 flex flex-wrap">
        {Array.isArray(dishesList) && dishesList?.length > 0 ? (
          dishesList?.map((i, idx) => {
            if (typeof i === "string") {
              return (
                <div key={i} className="mb-4 w-[100px] h-[200px] relative">
                  <Image
                    src={i}
                    alt="Dish Image"
                    className=" object-cover rounded"
                    fill
                    loading="lazy"
                  />
                </div>
              );
            }

            return (
              <div key={i._id ?? idx} className="mb-4  h-auto ">
                <div className="flex flex-col">
                  <div className="w-60 h-60 relative">
                    <Image
                      src={i?.image || ""}
                      alt={i.name}
                      className="object-cover rounded"
                      fill
                      loading="lazy"
                    />
                  </div>

                  <div className="max-w-full pt-2">
                    <p className="font-medium text-primary-text text-center ">
                      {i.name}
                    </p>
                    <p className="text-gray-500 text-center">
                      {i.price.toLocaleString()} đ
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full flex gap-4">
            <div className="w-[50%]">
              {Array.isArray((dishesList as Dish)?.images) &&
              ((dishesList as Dish).images?.length ?? 0) > 0 ? (
                <SliderComponent
                  isDishesCarousel
                  banners={(dishesList as Dish)?.images}
                />
              ) : (
                <div className="w-full h-[300px] relative">
                  <Image
                    src={(dishesList as Dish)?.image || ""}
                    alt={"img"}
                    className="object-cover rounded"
                    fill
                    loading="lazy"
                  />
                </div>
              )}
            </div>
            <div className="w-[40%]">
              <h3>{(dishesList as Dish)?.name}</h3>
              <p>{(dishesList as Dish)?.price.toLocaleString()}đ</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Menu);
