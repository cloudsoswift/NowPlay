import { useEffect, useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Filter } from "./Filter/Filter";
import { PlaceCard2, PlaceCardSheet } from "./PlaceCard";
import { IoReorderThree } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import api from "../../utils/api/api";
import Title from "../HomePage/Title";
import styled from "styled-components";
import { QGetNearbyStoreList, TNearbyStoreInput, TFilter, THobbyMainCategory, THobbySubCategory, TStoreOutputWithTotalCount, TStoreOutput } from "../../utils/api/graphql";
import { TMainCategory, TSubCategory } from "./Types";
import { UseInfiniteQueryResult, useInfiniteQuery } from "@tanstack/react-query";
import Pin2 from "../../svg/pin2.svg";
import { useLocation } from "react-router-dom";
import { SelectableCategory } from "./Filter/SelectableCategories";

type Props = {};

export const categoriesSelector = selector<Array<THobbyMainCategory>>({
  key: "categoriesSelector",
  get: async ({get})=>{
    return await (await api.get("place/categories")).data;
  }
})
export const filterState = atom<TFilter>({
  key: "filterState",
  default: {
    mainHobby: [],
    subcategory: [],
    latitude: 36.1078224,
    longitude: 128.4177517,
    maxDistance: 10,
    count: 1,
  },
});
export const Map = (props: Props) => {
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const markerList: Array<naver.maps.Marker> = [];
  let circle: naver.maps.Circle | undefined = undefined;
  const [clickedStore, setClickedStore] = useState<TStoreOutput>();
  const [mapInstance, setMapInstance] = useState<naver.maps.Map>();
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const categoryList = useRecoilValue(categoriesSelector);
  const recentAddressData: string[] = recentAddressStore();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalBox, setIsOpenModalBox] = useState<boolean>(false);
  const [selectAddress, setSelectAddress] = useState<string | null>(null);
  const [selectLocation, setSelectLocation] = useState<
  { latitude: number; longitude: number } | string
  >("");

  function recentAddressStore(): string[] {
    const recentAddressJSON = localStorage.getItem("RecentAddressSearch");
    if (recentAddressJSON === null) return [];
    return JSON.parse(recentAddressJSON);
  }
  const [isModalState, setIsModalState] = useState<boolean>(false);

  const setFilter = useSetRecoilState(filterState);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      location.state.map((subCategory: THobbySubCategory) => {
        setFilter((prevFilter) => {
          return {
            ...prevFilter,
            subcategory: prevFilter.subcategory.some(
              (subC) => subC.subcategory === subCategory.subcategory
            )
              ? [...prevFilter.subcategory]
              : [...prevFilter.subcategory, subCategory],
          };
        });
      });
    }
  }, []);

  const handleFilterToggle = (set: boolean) => {
    if (set) {
      setIsModalState(set);
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
        setFilterValue((prevFilter)=>{
          return {
            ...prevFilter,
            latitude: Number(item.y),
            longitude: Number(item.x),
          }
        })
      }
    );
  }

  const fetchCardList = async({pageParam = 1}) => {
    const query = QGetNearbyStoreList;
    const variables: {"condition": TNearbyStoreInput} = {
      condition: {
        ...filterValue,
        count: pageParam,
        mainHobby: [],
        subcategory: [],
        ...(filterValue.mainHobby.length + filterValue.subcategory.length > 0 && {
          mainHobby: filterValue.mainHobby.map((mainH)=>mainH.mainCategory),
          subcategory: filterValue.subcategory.map((subC)=>subC.subcategory),
        }),
        // 필터가 선택되지 않은 상태면 모든 카테고리 검색.
        ...(filterValue.mainHobby.length + filterValue.subcategory.length === 0 && {
          mainHobby: categoryList.map((mainH)=>mainH.mainCategory),
        })
      }
    };
    console.log(variables);
    const data = (await api.post("/graphql", {
      query,
      variables,
    })).data?.data;
    return data.getNearbyStoreList ? data.getNearbyStoreList : [] ;
  }
  const result = useInfiniteQuery({
    queryKey: ["getCardList"],
    queryFn: fetchCardList,
    getNextPageParam: (lastPage, pages)=> {console.log(lastPage, pages);
     return pages.length + 1 < lastPage.totalCount/20 ? pages.length + 1 : undefined},
    staleTime: 20000
  });
  console.log(result.isFetching);
  

  useEffect(() => {
    mapInstance?.setCenter(new naver.maps.LatLng(
      filterValue.latitude, 
      filterValue.longitude))
  }, [ filterValue.latitude, filterValue.longitude ]);
  useEffect(() => {
  }, [ filterValue ]);
  
  const handleClickMarker = (e: any) => {
    console.log(e);
    console.log(e.overlay.title);
    setClickedStore
  }
  const removeAllMarker = () => {
    for(const marker of markerList){
      marker.setMap(null);
    }
    markerList.splice(0);
  }
  useEffect(()=>{
    (result as UseInfiniteQueryResult<TStoreOutputWithTotalCount>).data?.pages?.forEach((page)=>{
      page.storeOutput.forEach((store)=>{
        markerList.push(new naver.maps.Marker({
          position: new naver.maps.LatLng(store.store.latitude, store.store.longitude),
          map: mapInstance,
          title: String(store.store.idx),
        }))
      })
    })
    for(const m of markerList){
      naver.maps.Event.addListener(m, 'click', handleClickMarker);
    }
    console.log(filterValue.maxDistance);
    console.log(markerList);
    if(circle != undefined){
      circle.setRadius(filterValue.maxDistance);
      circle.setCenter(new naver.maps.LatLng(filterValue.latitude, filterValue.longitude));
      return;
    } else {
      circle = new naver.maps.Circle({
        map: mapInstance,
        center: new naver.maps.LatLng(filterValue.latitude, filterValue.longitude),
        radius: filterValue.maxDistance * 1000,
        fillColor: 'blue',
        fillOpacity: 0.1,
      })
    }
  }, [result.data]);

  useEffect(()=>{
    // 최근 주소 기록 없으면, 주소 입력하도록 설정.
    if (recentAddressData.length === 0) {
      setTimeout(() => {
        alert("주소를 설정해 주세요");
        setIsOpenModal(true);
        setIsOpenModalBox(true);
      }, 100);
    } else {
      searchAddressToCoordinate(recentAddressData[0]);
    }
    
    if(mapInstance) return;
    setMapInstance(
      new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(
          filterValue.latitude,
          filterValue.longitude,
        ),
        zoom: 18,
      })
    )
  }, [])

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
          onSubmit={result.refetch}
          setIsOpenModal={setIsOpenModal}
          setIsOpenModalBox={setIsOpenModalBox}
          recentAddress={recentAddressData}
        />
      )}
      {/* </AnimatePresence> */}

      <div id="map" className="w-screen h-[calc(100vh-122px)] -z-0" />
      <button
        className="absolute top-12 left-1/2 -translate-x-1/2 border-2 border-black bg-white rounded-full"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          handleFilterToggle(true);
        }}
      >
        <IoReorderThree className="text-3xl" />
      </button>
      {clickedStore && <PlaceCard2 key={clickedStore.store.idx} place={clickedStore} />}
      {/* <button
        className="absolute bottom-20 left-1/2 -translate-x-1/2 border-2 border-black"
        onClick={handleCardListToggle}
        >
        카드리스트 호출 버튼
      </button> */}
      <PlaceCardSheet result={result}/>
    </>
  );
};

const TitleBox = styled.div`
  top: 42px;
  position: fixed;
  width: 100%;
  z-index: 9995;
`;