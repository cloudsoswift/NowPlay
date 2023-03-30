import styled, { keyframes } from "styled-components";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Search from "../SearchPage/Search";
import Aim from "../../svg/aim.svg";
import Vector from "../../svg/vector.svg";
import Pin1 from "../../svg/mini-pin.svg";

interface ModalType {
  onClickToggleMap: () => void;
  isMap: boolean;
  setSelectLocation: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >;
  recentAddressData: string[];
}

const MyLocationSearchBar = ({
  onClickToggleMap,
  isMap,
  setSelectLocation,
  recentAddressData,
  children,
}: PropsWithChildren<ModalType>) => {
  const [searchRoadAddress, setSearchRoadAddress] = useState<string>("");
  const [searchJibunAddress, setSearchJibunAddress] = useState<string>("");
  const [componentCheck, setComponentCheck] = useState<boolean>(false);
  const [searchMapText, setSearchMapText] = useState<string>("");
  const [searchLocation, setsearchLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  function searchAddressToCoordinate(address: string, check: boolean) {

    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        }
        if (response.v2.meta.totalCount === 0) {
          return alert("올바른 주소를 입력해주세요.");
        }
        // const htmlAddresses = [];
        const item = response.v2.addresses[0];
        if (item.roadAddress) {
          // htmlAddresses.push("[도로명 주소] " + item.roadAddress);
          setSearchRoadAddress(item.roadAddress);
        }
        if (item.jibunAddress) {
          // htmlAddresses.push("[지번 주소] " + item.jibunAddress);
          setSearchJibunAddress(item.jibunAddress);
        }
        // htmlAddresses.push([item.x, item.y]);
        if (check) {
          setsearchLocation({
            latitude: Number(item.y),
            longitude: Number(item.x),
          });
          setComponentCheck(true);
        } else {
          setSelectLocation({
            latitude: Number(item.y),
            longitude: Number(item.x),
          });
          if (onClickToggleMap) {
            onClickToggleMap();
          }
        }
      }
    );
  }

  useEffect(() => {
    if (!searchMapText) {
      setComponentCheck(false);
    }
  }, [searchMapText]);

  const searchSubmit = () => {
    searchAddressToCoordinate(searchMapText, true);
  };

  const SearchComponent = componentCheck ? (
    <SearchResult
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        setSelectLocation(searchLocation);
        if (onClickToggleMap) {
          onClickToggleMap();
        }
      }}
    >
      {searchRoadAddress && <div>[도로명 주소] {searchRoadAddress}</div>}
      {searchJibunAddress && <div>[지번 주소] {searchJibunAddress}</div>}
    </SearchResult>
  ) : (
    <RecentSearchList>
      {recentAddressData.map((address) => 
        <li onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          searchAddressToCoordinate(address, false)
        }}>
          <img src={Pin1}/>
          {address}
        </li>
      )}
    </RecentSearchList>
  );

  return (
    <MyBar isMap={isMap}>
      <Search
        innerPlaceHolder="지번, 도로명으로 검색"
        searchId="address"
        submit={searchSubmit}
        valueText={setSearchMapText}
      />
      <GoToMap
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleMap) {
            onClickToggleMap();
          }
        }}
      >
        <div>
          <img src={Aim} />
          현재 위치로 설정
        </div>
        <img src={Vector} />
      </GoToMap>
      <hr />
      {SearchComponent}
    </MyBar>
  );
};

export default MyLocationSearchBar;

const Slide = keyframes`
  0%{
    opacity: 0;
    transform: translateX(-30px);
  }
  100%{
    opacity: 1;
    transform: translateX(0px);
  }
`;

const MyBar = styled.div<{ isMap: boolean }>`
  width: 100%;
  animation-name: ${(props) => (!props.isMap ? Slide : null)};
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

const GoToMap = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
  align-items: center;
  margin-bottom: 15px;
  > div {
    display: flex;
    font-size: var(--body-text);
    > img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  > img {
    width: 20px;
    height: 20px;
  }
`;

const RecentSearchList = styled.ul`
  margin-left: 30px;
  margin-top: 15px;
  margin-right: 30px;
  > li {
    display: flex;
    margin-bottom: 15px;
    font-size: var(--body-text);
    height: 52px;
    align-items: center;
    > img {
      margin-top: auto;
      margin-bottom: auto;
      height: 30px;
      margin-right: 10px;
    }
  }
`;

const SearchResult = styled.div`
  margin: 15px 30px;
  > div {
    font-size: var(--body-text);
  }
`;
