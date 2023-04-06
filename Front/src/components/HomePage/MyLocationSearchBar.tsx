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
  searchRoadAddress: string;
  searchJibunAddress: string;
  componentCheck: boolean;
  setComponentCheck: React.Dispatch<React.SetStateAction<boolean>>;
  searchLocation: { latitude: number; longitude: number } | string;
  setsearchLocation: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >;
  searchAddressToCoordinate(address: string, setAddress: React.Dispatch<React.SetStateAction<string | {
    latitude: number;
    longitude: number;
}>>): void;
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

const MyLocationSearchBar = ({
  onClickToggleMap,
  isMap,
  setSelectLocation,
  recentAddressData,
  searchRoadAddress,
  searchJibunAddress,
  componentCheck,
  setComponentCheck,
  searchLocation,
  setsearchLocation,
  searchAddressToCoordinate,
  nowLocation,
  setNowLocation,
  nowAddress,
  setNowAddress,
  children,
}: PropsWithChildren<ModalType>) => {
  const [searchMapText, setSearchMapText] = useState<string>("");

  useEffect(() => {
    if (!searchMapText) {
      setComponentCheck(false);
    }
  }, [searchMapText]);

  const searchSubmit = () => {
    searchAddressToCoordinate(searchMapText, setsearchLocation);
  };

  const RecentSearchBox =
    recentAddressData.length === 0 ? (
      <NoRecent>최근 검색 기록이 없습니다.</NoRecent>
    ) : (
      <RecentSearchList>
        {recentAddressData.map((address) => (
          <li
            key={address}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              searchAddressToCoordinate(address, setSelectLocation);
              searchAddressToCoordinate(address, setNowLocation);
              if (onClickToggleMap) {
                onClickToggleMap()
              };
            }}
          >
            <img src={Pin1} />
            {address}
          </li>
        ))}
      </RecentSearchList>
    );

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
    <>{RecentSearchBox}</>
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

const NoRecent = styled.div`
  margin: 15px 50px;
  color: var(--gray-color);
  > div {
    font-size: var(--body-text);
  }
`;
