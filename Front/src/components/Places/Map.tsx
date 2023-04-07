import { useEffect, useRef, useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Filter } from "./Filter/Filter";
import { PlaceCard2, PlaceCardSheet } from "./PlaceCard";
import { IoReorderThree } from "react-icons/io5";
import api from "../../utils/api/api";
import Title from "../HomePage/Title";
import styled from "styled-components";
import { QGetNearbyStoreList, TNearbyStoreInput, TFilter, THobbyMainCategory, THobbySubCategory, TStoreOutputWithTotalCount, TStoreOutput } from "../../utils/api/graphql";
import { UseInfiniteQueryResult, useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { BottomSheetMetrics, initialMetrics } from "../../utils/hooks/useBottomSheet";

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
  const [markerList, setMarkerList] = useState<Array<naver.maps.Marker>>([]);
  const [circle, setCircle] = useState<naver.maps.Circle>();
  const [clickedStore, setClickedStore] = useState<TStoreOutput | undefined>();
  const [mapInstance, setMapInstance] = useState<naver.maps.Map>();
  const [filterValue, setFilterValue] = useRecoilState(filterState);
  const [isRendered, setIsRendered] = useState(false);
  const categoryList = useRecoilValue(categoriesSelector);
  const recentAddressData: string[] = recentAddressStore();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalBox, setIsOpenModalBox] = useState<boolean>(false);
  const [selectAddress, setSelectAddress] = useState<string | null>(null);
  const [selectLocation, setSelectLocation] = useState<
  { latitude: number; longitude: number } | string
  >("");
  // 클릭된 가게 박스 관련
  const clickedRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<BottomSheetMetrics>(initialMetrics);

  function recentAddressStore(): string[] {
    const recentAddressJSON = localStorage.getItem("RecentAddressSearch");
    if (recentAddressJSON === null) return [];
    return JSON.parse(recentAddressJSON);
  }

  const setFilter = useSetRecoilState(filterState);
  const location = useLocation();

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
    const data = (await api.post("/graphql", {
      query,
      variables,
    })).data?.data;
    // console.log(variables, data);
    return data.getNearbyStoreList ? data.getNearbyStoreList : [] ;
  }
  const result = useInfiniteQuery<TStoreOutputWithTotalCount>({
    queryKey: ["getCardList", filterValue],
    queryFn: fetchCardList,
    getNextPageParam: (lastPage, pages)=> {
     return pages.length + 1 < lastPage.totalCount/20 ? pages.length + 1 : undefined},
    staleTime: 20000,
    cacheTime: 0,
    enabled: isRendered,
  });  

  useEffect(() => {
    mapInstance?.setCenter(new naver.maps.LatLng(
      filterValue.latitude, 
      filterValue.longitude))
    if(circle !== undefined){
      setCircle((prevCircle)=>{
        // console.log("수정 전",prevCircle);
        if(prevCircle){
          if(!prevCircle.getMap() && mapInstance){
            prevCircle.setMap(mapInstance);
          }
          prevCircle.setRadius(filterValue.maxDistance * 1000);
          prevCircle.setCenter(new naver.maps.LatLng(filterValue.latitude, filterValue.longitude));
          // console.log("수정 후",prevCircle);
        }
        return prevCircle;
      });
    } else {
      // console.log(mapInstance);
      if(mapInstance){
        setCircle(new naver.maps.Circle({
          map: mapInstance,
          center: new naver.maps.LatLng(filterValue.latitude, filterValue.longitude),
          radius: filterValue.maxDistance * 1000,
          fillColor: 'blue',
          fillOpacity: 0.1,
        }));
      }
    }
  }, [ filterValue.latitude, filterValue.longitude, filterValue.maxDistance]);
  
  const handleClickMarker = (e: any) => {
    if(result.data){
      setClickedStore(result.data.pages.find((page)=>
        page.storeOutput.find((store)=>
          store.store.idx === e.overlay.title))?.storeOutput.find((store)=>store.store.idx === e.overlay.title));
    }
  }
  useEffect(()=>{
    if(clickedStore){
      const handleTouchStart = (e: TouchEvent) => {
        const {touchStart, touchMove} = metrics.current;
        // 유저가 BottomSheet 터치했을 때의 y 좌표 기록
        touchStart.sheetY = clickedRef.current!.getBoundingClientRect().y; // BottomSheet의 Y값
        touchStart.touchY = e.touches[0].clientY; // 터치 포인트의 Y값
        touchMove.prevTouchY = touchStart.touchY;
      };
      
      const handleTouchMove = (e: TouchEvent) => {
  
        const {touchStart, touchMove} = metrics.current;
        const currentTouch = e.touches[0];
  
        // 이전 터치 기록값 없으면 터치 시작점을 기록
        if(touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0){
          touchMove.prevTouchY = touchStart.touchY;
        }
        // 이전 터치 기록 - 현재 터치 위치 비교해서 위로 끌고가는지 아래로 끌고가는지 판단
        if(touchMove.prevTouchY < currentTouch.clientY){
          touchMove.movingDirection = 'down';
        } else {
          touchMove.movingDirection = 'none';
        }
        if(touchMove.movingDirection === 'down'){
          // 터치 시작점 부터 현재 터치 포인트 까지 y값 차이
          const touchOffset = currentTouch.clientY - touchStart.touchY;
          let nextSheetY = touchStart.sheetY + touchOffset;
          // nextSheetY는 MIN_Y와 MAX_Y 사이의 값이어야 함.
          // if(nextSheetY < clickedRef.current?.getBoundingClientRect().height){
          //   nextSheetY = MIN_Y;
          // }
            clickedRef.current?.style.setProperty('transform', `translateY(${touchOffset}px)`);
          }
      };
  
      const handleTouchEnd = (e: TouchEvent) => {
        const {touchMove} = metrics.current;
        const currentSheetY = clickedRef.current?.getBoundingClientRect().y;
        // Snap Animation
        if(touchMove.movingDirection === 'down'){
          clickedRef.current?.style.setProperty('transform', `translateY(${currentSheetY}px)`);
          setClickedStore(undefined);
        }
        // metrics 초기화
        metrics.current = initialMetrics;
      }
      clickedRef.current?.addEventListener('touchstart', handleTouchStart);
      clickedRef.current?.addEventListener('touchmove', handleTouchMove);
      clickedRef.current?.addEventListener('touchend', handleTouchEnd);
      return () => {
        // 클린업 함수로 달아놨던 이벤트리스너 삭제
        clickedRef.current?.removeEventListener('touchstart', handleTouchStart);
        clickedRef.current?.removeEventListener('touchmove', handleTouchMove);
        clickedRef.current?.removeEventListener('touchend', handleTouchEnd);
      }
      
    }
  }, [clickedStore])

  const removeAllMarker = () => {
    // console.log("호출됨");
    setMarkerList((prev)=>{
      // console.log("ㅎㅇ", prev);
      prev.map((marker)=>{
        marker.setMap(null);
        marker.setVisible(false);
      })
      return [];
    })
  }
  useEffect(()=>{
    removeAllMarker();
    let arr:Array<naver.maps.Marker> = [];
    (result as UseInfiniteQueryResult<TStoreOutputWithTotalCount>).data?.pages?.forEach((page)=>{
      page.storeOutput.forEach((store)=>{
        arr.push(new naver.maps.Marker({
          position: new naver.maps.LatLng(store.store.latitude, store.store.longitude),
          map: mapInstance,
          title: String(store.store.idx),
        }))
      })
    })
    for(const m of arr){
      naver.maps.Event.addListener(m, 'click', handleClickMarker);
    }
    setMarkerList(arr);
  }, [result.data]);

  useEffect(()=>{
    if(isRendered) return;
        // 라우터 state 있으면 ( 메인 페이지에서 대분류 눌러서 넘어온거면)
    // 해당 대분류에 포함되는 소분류 카테고리들 전부 선택된 채로 넘어감.
    if (location.state) {
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
    if(mapInstance){
      setCircle(new naver.maps.Circle({
        map: mapInstance,
        center: new naver.maps.LatLng(filterValue.latitude, filterValue.longitude),
        radius: filterValue.maxDistance * 1000,
        fillColor: 'blue',
        fillOpacity: 0.1,
      }));
    }
    setIsRendered(true);
  }, [])

  return (
    <>
      {(result.isLoading || result.isFetching) && <div className="absolute w-screen h-screen bg-slate-400"> 로딩중입니다... </div>}
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
      {
       result.isLoading && <div>로딩중...</div> 
      }
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
      {clickedStore && <FloatBox ref={clickedRef}>
        <PlaceCard2 key={clickedStore.store.idx} place={clickedStore} onBookmark={result.refetch}/>
      </FloatBox>}
      {/* <button
        className="absolute bottom-20 left-1/2 -translate-x-1/2 border-2 border-black"
        onClick={handleCardListToggle}
        >
        카드리스트 호출 버튼
      </button> */}
      {!clickedStore && <PlaceCardSheet result={result}/>}
    </>
  );
};

const TitleBox = styled.div`
  top: 42px;
  position: fixed;
  width: 100%;
  z-index: 9995;
`;

const FloatBox = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100vw;
  max-height: 40vh;
  z-index: 20;
  background-color: white;
`
