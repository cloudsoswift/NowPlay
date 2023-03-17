import { useEffect, useState } from "react";
import { atom } from "recoil";
import { Filter } from "./Filter/Filter";
import { PlaceCards } from "./PlaceCard";
import type { TFilter } from "./Types";
import * as json from "./Filter/categories.json";
declare global {
  interface Window {
    naver: naver.maps.Map;
  }
}

type Props = {};

export const filterState = atom<TFilter>({
  key: 'filterState',
  default: { categories: json.categories, selectedCategories: [], businessTime: "", distance: 0 },
})
export const Map = (props: Props) => {
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [isCardlistShown, setIsCardlistShown] = useState(false);

  const handleFilterToggle = () => {
    setIsFilterShown((prevState)=>!prevState);
  }
  const handleCardListToggle = () => {
    setIsCardlistShown((prevState)=>!prevState);
  }
  useEffect(() => {
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
  }, []);
  return (
    <>
      <div id="map" className="w-screen h-[calc(100vh-160px)] my-20">
      {isCardlistShown && <PlaceCards onClose={setIsCardlistShown}/>}
      </div>
      <button className="absolute top-24 left-1/2 -translate-x-1/2 border-2 border-black" onClick={handleFilterToggle}>필터 호출 버튼</button>
      {isFilterShown && <Filter className="w-screen h-[50vh] bg-white border-4 absolute top-20 left-0 overflow-y-auto" style={{zIndex: "100"}} onClose={setIsFilterShown}/>}
      <button className="absolute bottom-24 left-1/2 -translate-x-1/2 border-2 border-black" onClick={handleCardListToggle}>카드리스트 호출 버튼</button>
    </>
  );
};
