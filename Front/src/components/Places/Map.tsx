import { useEffect, useState } from "react";
import { atom } from "recoil";
import { Filter } from "./Filter/Filter";
import { PlaceCardSheet } from "./PlaceCard";
import { IoReorderThree } from "react-icons/io5";
import type { TFilter, TSubCategory } from "./Types";
import * as json from "./Filter/categories.json";
import { AnimatePresence } from "framer-motion";
import Title from "../HomePage/Title";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SelectableCategory } from "./Filter/SelectableCategories";

type Props = {};

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
  const [isCardlistShown, setIsCardlistShown] = useState(false);
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

  const setFilter = useSetRecoilState(filterState);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      location.state.map((subCategory: TSubCategory) => {
        setFilter((prevFilter) => {
          return {
            ...prevFilter,
            selectedCategories: prevFilter.selectedCategories.some(
              (subC) => subC.category === subCategory.category
            )
              ? [...prevFilter.selectedCategories]
              : [...prevFilter.selectedCategories, subCategory],
          };
        });
      });
    }
  }, []);

  const handleFilterToggle = (set: boolean) => {
    if (set) {
      setIsModalShown(set);
      setIsFilterShown(set);
    } else {
      setIsModalShown(set);
      setTimeout(() => setIsFilterShown(set), 500);
    }
  };
  const handleCardListToggle = () => {
    setIsCardlistShown((prevState) => !prevState);
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
