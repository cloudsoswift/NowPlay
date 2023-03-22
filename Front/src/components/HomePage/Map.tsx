import { useState, useEffect } from "react";
import Pin1 from "../../svg/mini-pin.svg";

const Map = () => {
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  const [selectLocation, setSelectLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  const onClickNowLocation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (typeof myLocation !== "string") {
      const position = new naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude
      );

      const map = new naver.maps.Map("map", {
        center: position,
        zoom: 17,
        zoomControl: true,
      });

      const marker = new naver.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: Pin1,
          size: new naver.maps.Size(46, 58),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(23, 58),
        },
      });

      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord);
        setSelectLocation({
          latitude: e.coord._lat,
          longitude: e.coord._lng,
        })
      });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  useEffect(()=> {
    console.log('현재 위치',  myLocation)
    if (typeof myLocation !== "string") {
      const position = new naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude
      );
  
      const map = new naver.maps.Map("map", {
        center: position,
        zoom: 17,
        zoomControl: true,
      });
  
      const marker = new naver.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: Pin1,
          size: new naver.maps.Size(46, 58),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(23, 58),
        },
      });
  
      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord);
        setSelectLocation({
          latitude: e.coord._lat,
          longitude: e.coord._lng,
        })
      });
    }
  }, [myLocation])

  console.log('클릭 위치', selectLocation)

  const mapStyle = {
    width: "100vw",
    height: "35vh",
  };
  return (
    <div>
      <div id="map" style={mapStyle} />
      <div onClick={onClickNowLocation} style={{ color: "white", textAlign: "center" }}>현재위치로!</div>
    </div>
  );
};

export default Map;