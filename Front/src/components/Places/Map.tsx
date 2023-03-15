import { useEffect } from "react";
import { Categories } from "./Filter/Categories";
import { Filter } from "./Filter/Filter";

declare global {
  interface Window {
    naver: naver.maps.Map;
  }
}

type Props = {};
export const Map = (props: Props) => {
  useEffect(() => {
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
  }, []);
  return (
    <>
      <div id="map" className="w-screen h-[calc(100vh-80px)] my-20"></div>
      <button className="absolute top-20 left-1/2 -translate-x-1/2 border-2 border-black">필터 호출 버튼</button>
      <Filter className=""/>
      <button className="absolute bottom-20 left-1/2 -translate-x-1/2 border-2 border-black">카드리스트 호출 버튼</button>
    </>
  );
};
