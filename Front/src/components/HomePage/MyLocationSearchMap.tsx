import styled, { keyframes } from "styled-components";
import { PropsWithChildren, useEffect, useState } from "react";
import Vector from "../../svg/vector.svg";
import Pin2 from "../../svg/pin2.svg";
import NowMap from "./NowMap";
import { useSetRecoilState } from "recoil";
import { filterState } from "../Places/Map";

interface ModalType {
  onClickToggleMap: () => void;
  onClickToggleModal: () => void;
  selectAddress: string | null;
  setSelectAddress: React.Dispatch<React.SetStateAction<string | null>>;
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
  isMap: boolean;
  recentAddressData: string[];
  nowAddress: string;
  setNowAddress: React.Dispatch<React.SetStateAction<string>>;
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

const MyLocationSearchMap = ({
  onClickToggleMap,
  onClickToggleModal,
  selectAddress,
  setSelectAddress,
  defaultLocation,
  selectLocation,
  setSelectLocation,
  findAddress,
  isMap,
  recentAddressData,
  nowLocation,
  setNowLocation,
  nowAddress,
  setNowAddress,
  children,
}: PropsWithChildren<ModalType>) => {

  const setFilterValue = useSetRecoilState(filterState);
  useEffect(() => {
    if (selectAddress !== null) {
      setNowAddress(selectAddress)
    }
  }, [])

  const setMap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSelectAddress(nowAddress);
    if(typeof selectLocation !== 'string'){
      setFilterValue((prev)=>({
        ...prev,
        latitude: selectLocation.latitude,
        longitude: selectLocation.longitude
      }))
    }
    const duplicationAddress =  recentAddressData.findIndex(address => address === nowAddress)
    if (duplicationAddress !== -1) {
      recentAddressData.splice(duplicationAddress, 1)
    }
    if (nowAddress !== null) {
      recentAddressData.unshift(nowAddress)
    }
    if (recentAddressData.length > 5) {
      recentAddressData.pop()
    }
    localStorage.setItem("RecentAddressSearch", JSON.stringify(recentAddressData))
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  }

  return (
    <MyMap isMap={isMap}>
      <TopArea>
        <img
          src={Vector}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (onClickToggleMap) {
              onClickToggleMap();
            }
          }}
        />
        <div>지도에서 위치 확인</div>
      </TopArea>
      <MapArea>
        <NowMap
          defaultLocation={defaultLocation}
          selectLocation={selectLocation}
          setSelectLocation={setSelectLocation}
          nowLocation={nowLocation}
          setNowLocation={setNowLocation}
          nowAddress={nowAddress}
          setNowAddress={setNowAddress}
          findAddress={findAddress}
        />
      </MapArea>
      <LocationArea>
        <img src={Pin2} />
        <div>{nowAddress}</div>
      </LocationArea>
      <ButtonArea
        onClick={setMap}
      >
        이 위치로 주소 설정
      </ButtonArea>
    </MyMap>
  );
};

export default MyLocationSearchMap;

const Slide = keyframes`
  0%{
    opacity: 0;
    transform: translateX(30px);
  }
  100%{
    opacity: 1;
    transform: translateX(0px);
  }
`;

const MyMap = styled.div<{ isMap: boolean }>`
  width: 100%;
  height: 100%;
  animation-name: ${(props) => (!props.isMap ? null : Slide)};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  > hr {
    background: var(--gray-color);
    height: 1px;
    border: 0;
    margin-inline: 16px;
  }
`;

const TopArea = styled.div`
  display: flex;
  height: 30px;
  margin: 15px;
  align-items: center;
  > img {
    width: 20px;
    height: 20px;
    transform: scaleX(-1);
  }
  > div {
    font-size: var(--body-text);
    margin-left: 50px;
  }
`;

const MapArea = styled.div`
  margin-inline: auto;
  width: 100%;
  /* background-color: var(--primary-color); */
`;

const LocationArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  > img {
    margin: auto 0px;
    width: 15px;
    height: 15px;
  }
  > div {
    font-size: var(---caption);
    margin: auto 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ButtonArea = styled.div`
  margin-inline: auto;
  margin-bottom: 15px;
  text-align: center;
  width: 80%;
  height: 40px;
  background-color: var(--primary-color);
  font-size: var(--title-2);
  color: var(--body-color);
  line-height: 43px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px gray;
`;
