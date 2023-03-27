import { useEffect, useState } from "react";
import { atom } from "recoil";
import { Filter } from "./Filter/Filter";
import { PlaceCardSheet } from "./PlaceCard";
import { IoReorderThree } from "react-icons/io5";
import type { TFilter } from "./Types";
import * as json from "./Filter/categories.json";
import { AnimatePresence } from "framer-motion";

type Props = {};

export const filterState = atom<TFilter>({
  key: "filterState",
  default: {
    categories: json.categories.map((C) => {
      return {
        ...C,
        type: "Main",
        subCategory: C.subCategory.map((subC) => {
          return {
            ...subC,
            type: "Sub",
          };
        }),
      };
    }),
    selectedCategories: [],
    businessTime: "",
    distance: 0,
  },
});
export const Map = (props: Props) => {
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [isCardlistShown, setIsCardlistShown] = useState(false);
  const [markerList, setMarkerList] = useState<Array<naver.maps.Marker>>([]);

  const handleFilterToggle = () => {
    setIsFilterShown((prevState) => !prevState);
  };
  const handleCardListToggle = () => {
    setIsCardlistShown((prevState) => !prevState);
  };
  useEffect(() => {
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
  }, []);
  return (
    <>
      <div id="map" className="w-screen h-[calc(100vh-122px)] -z-0"></div>
      <button
        className="absolute top-12 left-1/2 -translate-x-1/2 border-2 border-black bg-white rounded-full"
        onClick={handleFilterToggle}
      >
        <IoReorderThree className="text-3xl" />
      </button>
      <AnimatePresence initial={false}>
        {isFilterShown && (
          <Filter
            className="w-screen h-[50vh] bg-white border-2 rounded-b-lg absolute top-12 left-0 overflow-y-auto p-4 space-y-2"
            onClose={setIsFilterShown}
          />
        )}
      </AnimatePresence>
      {/* <button
        className="absolute bottom-20 left-1/2 -translate-x-1/2 border-2 border-black"
        onClick={handleCardListToggle}
        >
        카드리스트 호출 버튼
      </button> */}
      <PlaceCardSheet />
    </>
  );
};
