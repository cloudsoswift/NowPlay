import { useEffect, useState } from "react";
import { atom, selector, useRecoilValue } from "recoil";
import { Filter } from "./Filter/Filter";
import { PlaceCardSheet } from "./PlaceCard";
import { IoReorderThree } from "react-icons/io5";
import type { TFilter } from "./Types";
import * as json from "./Filter/categories.json";
import { AnimatePresence } from "framer-motion";
import api from "../../utils/api/api";
import Title from "../HomePage/Title";
import styled from "styled-components";
import { QGetNearbyStoreList, TNearbyStoreInput } from "../../utils/api/graphql";
import axios from "axios";
import {request, gql} from "graphql-request";

type Props = {};

const categoriesSelector = selector({
  key: "categoriesSelector",
  get: async ({get})=>{
    return await (await api.get("place/categories")).data;
  }
})
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
  const [isModalShown, setIsModalShown] = useState(false);
  const [markerList, setMarkerList] = useState<Array<naver.maps.Marker>>([]);
  function recentAddressStore(): string[] {
    const recentAddressJSON = localStorage.getItem("RecentAddressSearch");
    if (recentAddressJSON === null) return [];
    return JSON.parse(recentAddressJSON);
  }
  const recentAddressData: string[] = recentAddressStore();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalBox, setIsOpenModalBox] = useState<boolean>(false);
  const [selectAddress, setSelectAddress] = useState<string | null>(null);
  const defaultLocation = { latitude: 36.1078224, longitude: 128.4177517 };
  const [selectLocation, setSelectLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  const handleFilterToggle = (set: boolean) => {
    if (set) {
      setIsModalShown(set);
      setIsFilterShown(set);
    } else {
      setIsModalShown(set);
      setTimeout(() => setIsFilterShown(set), 500);
    }
  };

  function searchAddressToCoordinate(address: string) {
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
        const item = response.v2.addresses[0];
        setSelectLocation({
          latitude: Number(item.y),
          longitude: Number(item.x),
        });
      }
    );
  }

  useEffect(() => {
    const t = async() => {
      const query = QGetNearbyStoreList;
      const variables: {"condition": TNearbyStoreInput} = {
        condition: {
          mainHobby: ["체육"],
          subcategory: [""],
          latitude: 36.1220611,
          longitude: 128.3271009,
          maxDistance: 100000,
          count: 0,
        }
      };
      // request("https://j8d110.p.ssafy.io/spring/graphql", gql`${query}`, variables).then((response)=>console.log(response));
      // const a = axios.create();
      // a.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://j8d110.p.ssafy.io';
      // a.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
      // a.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
      console.log(await api.post(
        "/graphql",
        {
          query,
          variables,
        },
        {
          // baseURL: "http://j8d110.p.ssafy.io:8085/spring",
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }));
        
      
    }
    t();
    if (recentAddressData.length === 0) {
      setTimeout(() => {
        alert("주소를 설정해 주세요");
        setIsOpenModal(true);
        setIsOpenModalBox(true);
      }, 100);
    } else {
      searchAddressToCoordinate(recentAddressData[0]);
    }
  }, []);

  useEffect(() => {
    if (!isOpenModal) {
      if (typeof selectLocation !== "string") {
        const map = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(
            selectLocation.latitude,
            selectLocation.longitude
          ),
          zoom: 10,
        });
      } else {
        const map = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(
            defaultLocation.latitude,
            defaultLocation.longitude
          ),
          zoom: 10,
        });
      }
    } 
  }, [isOpenModal, selectLocation]);

  return (
    <>
      {/* <AnimatePresence initial={false}> */}
      {isOpenModal && (
        <TitleBox>
          <Title
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            selectAddress={selectAddress}
            setSelectAddress={setSelectAddress}
            isOpenModalBox={isOpenModalBox}
            setIsOpenModalBox={setIsOpenModalBox}
            selectLocation={selectLocation}
            setSelectLocation={setSelectLocation}
            textBoolean={false}
          />
        </TitleBox>
      )}
      {isFilterShown && (
        <Filter
          // className="w-screen h-[50vh] bg-white border-2 rounded-b-lg absolute top-12 left-0 overflow-y-auto p-4 space-y-2"
          className=""
          onClose={handleFilterToggle}
          isFilterShown={isFilterShown}
          isModalShown={isModalShown}
        />
      )}
      {/* </AnimatePresence> */}
      <div id="map" className="w-screen h-[calc(100vh-122px)] -z-0"></div>
      <button
        className="absolute top-12 left-1/2 -translate-x-1/2 border-2 border-black bg-white rounded-full"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          handleFilterToggle(true);
        }}
      >
        <IoReorderThree className="text-3xl" />
      </button>
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

const TitleBox = styled.div`
  position: fixed;
  width: 100%;
  z-index: 9995;
`;
