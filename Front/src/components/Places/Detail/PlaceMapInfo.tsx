import {useEffect} from "react";
import { GrMapLocation } from "react-icons/gr";
type Props = {
  latitude: number,
  longitude: number,
  address: string,
};
export const PlaceMapInfo = ({address, latitude, longitude}: Props) => {
  useEffect(()=>{
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    });
  }, [])
  return (
    <div>
      <div className="border-t-0 flex p-2 text-lg items-center">
        <GrMapLocation className="mr-2 text-lg" /> {address}
      </div>
      <div id="map" className="w-[calc(100vw-32px)] h-[calc(100vw-32px)] -z-20" />
    </div>
  );
}; 