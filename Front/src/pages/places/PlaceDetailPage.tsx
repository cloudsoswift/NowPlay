import {useState} from 'react';
import { PlaceDetailInfo } from '../../components/Places/Detail/PlaceDetailInfo';
import { PlaceMapInfo } from '../../components/Places/Detail/PlaceMapInfo';
import { ReviewInfo } from '../../components/Places/Detail/ReviewInfo';
import { TPlaceDetail } from '../../components/Places/Types';
type Props = {
  
};
export const PlaceDetailPage = (props: Props) => {
  const TEST_DATA:TPlaceDetail = {
    id: 1,
    imageURL: "place_test_image.png",
    name: "스파크 노래타운",
    subCategory: "노래방",
    address: "경북 구미시 인동중앙로1길 5",
    distance: 0.513,
    averageRating: 4.0,
    reviewCount: 4,
    isBookmark: true,
    businessTimes: [],
    contactNumber: "010-1234-5678",
    homepage: "http://www.ssafy.com/",
    imageURLs: ["", "", ""],
    latitude: 36.107106,
    longitude: 128.416199,
    description: "설명이에요",
    isClosedOnHolidays: false,
  }
  const [tabIndex, setTabIndex] = useState(0);
  const tabButton = "border rounded-xl p-2"
  const selectedTabButton = `${tabButton} bg-[var(--primary-color)] text-white`
  return (
    <div className="px-4">
      <div>
        <div>사진 {TEST_DATA.imageURL}</div>
        <div>사업장 이름 {TEST_DATA.name}</div>
        <div>평균 별점 {TEST_DATA.averageRating}</div>
      </div>
      <div className="space-x-2 flex justify-center">
        <button className={tabIndex === 0 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(0)}}>가게 정보</button>
        <button className={tabIndex === 1 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(1)}}>위치 / 주차</button>
        <button className={tabIndex === 2 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(2)}}>리뷰</button>
      </div>
      <div>
        {tabIndex === 0 && <PlaceDetailInfo placeDetail={TEST_DATA}/>}
        {tabIndex === 1 && <PlaceMapInfo address={TEST_DATA.address} latitude={TEST_DATA.latitude} longitude={TEST_DATA.longitude}/>}
        {tabIndex === 2 && <ReviewInfo />}
      </div>
    </div>
  );
};