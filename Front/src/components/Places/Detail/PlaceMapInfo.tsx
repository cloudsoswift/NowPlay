import {useEffect} from "react";
type Props = {
  latitude: number,
  longitude: number,
  address: string,
};
export const PlaceMapInfo = ({address, latitude, longitude}: Props) => {
  useEffect(()=>{
    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 11,
    });
  }, [])
  return (
    <div>
      <div>{address}</div>
      <div id="map" className="w-screen h-[calc(100vh-160px)] mt-20" />
    </div>
  );
}; 