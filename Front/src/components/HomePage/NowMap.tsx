import { PropsWithChildren, useState, useEffect } from "react";
import styled from "styled-components";
import Pin1 from "../../svg/mini-pin.svg";
import Aim from "../../svg/aim.svg";

interface NowMapType {
  nowAddress: string;
  setNowAddress: React.Dispatch<React.SetStateAction<string>>;
  findAddress: (
    latlng: naver.maps.LatLng,
    map: naver.maps.Map,
    select: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  defaultLocation: { latitude: number; longitude: number };
  selectLocation: { latitude: number; longitude: number } | string;
  setSelectLocation: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >;
  nowLocation: { latitude: number; longitude: number } | string;
  setNowLocation: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >;
}

const NowMap = ({
  nowAddress,
  setNowAddress,
  findAddress,
  defaultLocation,
  nowLocation,
  setNowLocation,
  selectLocation,
  setSelectLocation,
  children,
}: PropsWithChildren<NowMapType>) => {
  const onClickNowLocation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (typeof nowLocation !== "string") {
      const position = new naver.maps.LatLng(
        nowLocation.latitude,
        nowLocation.longitude
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
          size: new naver.maps.Size(29, 38),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(14.5, 38),
        },
      });

      findAddress(position, map as naver.maps.Map, setNowAddress);
      // setSelectLocation(nowLocation);

      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord);
        setSelectLocation({
          latitude: e.coord._lat,
          longitude: e.coord._lng,
        });
        findAddress(e.coord, map as naver.maps.Map, setNowAddress);
      });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setNowLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  useEffect(() => {
    console.log(selectLocation)
    if (typeof selectLocation !== "string") {
      const position = new naver.maps.LatLng(
        selectLocation.latitude,
        selectLocation.longitude
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
          size: new naver.maps.Size(29, 38),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(14.5, 38),
        },
      });

      findAddress(position, map as naver.maps.Map, setNowAddress);

      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord);
        setSelectLocation({
          latitude: e.coord._lat,
          longitude: e.coord._lng,
        });
        findAddress(e.coord, map as naver.maps.Map, setNowAddress);
      });
    } else if (typeof nowLocation !== "string") {
      const position = new naver.maps.LatLng(
        nowLocation.latitude,
        nowLocation.longitude
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
          size: new naver.maps.Size(29, 38),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(14.5, 38),
        },
      });

      findAddress(position, map as naver.maps.Map, setNowAddress);

      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord);
        setSelectLocation({
          latitude: e.coord._lat,
          longitude: e.coord._lng,
        });
        findAddress(e.coord, map as naver.maps.Map, setNowAddress);
      });
    } else if (typeof defaultLocation !== "string") {
      const position = new naver.maps.LatLng(
        defaultLocation.latitude,
        defaultLocation.longitude
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
          size: new naver.maps.Size(29, 38),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(14.5, 38),
        },
      });

      findAddress(position, map as naver.maps.Map, setNowAddress);

      naver.maps.Event.addListener(map, "click", function (e) {
        marker.setPosition(e.coord);
        setSelectLocation({
          latitude: e.coord._lat,
          longitude: e.coord._lng,
        });
        findAddress(e.coord, map as naver.maps.Map, setNowAddress);
      });
    }
  }, [nowLocation]);

  return (
    <div>
      <MapBox id="map" />
      <NowGeo onClick={onClickNowLocation}>
        <img src={Aim} />
      </NowGeo>
    </div>
  );
};

export default NowMap;

const MapBox = styled.div`
  width: 100vw;
  height: 40vh;
  max-height: 100%;
`;

const NowGeo = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  width: 40px;
  height: 40px;
  padding: 5px;
  /* background-color: var(--primary-color); */
  background-color: var(--body-color);
  box-shadow: 3px 3px 3px gray;
  border-radius: 10px;
  > img {
    /* filter: invert(100%); */
    width: 30px;
    height: 30px;
  }
`;
