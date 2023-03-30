import {useState} from 'react';
import { Link } from 'react-router-dom';
import { PlaceDetailInfo } from '../../components/Places/Detail/PlaceDetailInfo';
import { PlaceMapInfo } from '../../components/Places/Detail/PlaceMapInfo';
import { ReviewInfo } from '../../components/Places/Detail/ReviewInfo';
import { StarRating } from '../../components/Places/StarRating';
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
  const tabButton = "p-2"
  const selectedTabButton = `${tabButton} bg-[var(--primary-color)] text-white`
  return (
    <div className="px-4 h-[calc(100vh-128px)] overflow-y-scroll">
      <div>
        <div className='flex justify-center'><img src={`/pics/${TEST_DATA.imageURL}`}/></div>
        <div className='text-3xl text-center'>{TEST_DATA.name}</div>
        <StarRating rating={TEST_DATA.averageRating} className={"justify-center"}/>
        <div className="flex justify-center">
        <Link to="reservation" className="w-full border my-2 text-center">예약</Link>
        </div>
      </div>
      <div className="flex justify-center border-y-2 [&>*]:mx-2">
        <div className={tabIndex === 0 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(0)}}>가게 정보</div>
        <div className={tabIndex === 1 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(1)}}>위치 / 주차</div>
        <div className={tabIndex === 2 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(2)}}>리뷰</div>
      </div>
      <div>
        {tabIndex === 0 && <PlaceDetailInfo placeDetail={TEST_DATA}/>}
        {tabIndex === 1 && <PlaceMapInfo address={TEST_DATA.address} latitude={TEST_DATA.latitude} longitude={TEST_DATA.longitude}/>}
        {tabIndex === 2 && <ReviewInfo />}
      </div>
    </div>
  );
};