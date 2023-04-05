import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlaceDetailInfo } from '../../components/Places/Detail/PlaceDetailInfo';
import { PlaceMapInfo } from '../../components/Places/Detail/PlaceMapInfo';
import { ReviewInfo } from '../../components/Places/Detail/ReviewInfo';
import { StarRating } from '../../components/Places/StarRating';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api/api';
import { PopupImage } from '../../components/Places/PopupImage';
import { TStoreDetail } from '../../utils/api/graphql';
type Props = {
  
};
export const PlaceDetailPage = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const tabButton = "p-2"
  const selectedTabButton = `${tabButton} bg-[var(--primary-color)] text-white`
  const {id} = useParams();
  const fetchStoreDetail = () => {
    return api.get(`place/${id}/store`).then(({data})=>data);
  }
  const {data, error, isLoading} = useQuery<TStoreDetail>(["storeDetail"], fetchStoreDetail);
  console.log(data, error, isLoading);
  
  return (
    !isLoading && data &&
    <div className="px-4 h-[calc(100vh-128px)] overflow-y-scroll" ref={pageRef}>
      <div>
        <div className='flex justify-center'><PopupImage imageURL={`${data.imagesUrl ? data.imagesUrl : data.subcategory.subcategoryImageUrl}`} imageClass="w-[80vw] h-[80vw] object-contain"/></div>
        <div className='text-3xl text-center'>{data.name}</div>
        <StarRating rating={data.averageRating} className={"justify-center"}/>
        <div className="flex justify-center">
        {data.owner?.idx !== undefined && data.owner.idx !== 0 && <Link to="reservation" className="w-full border my-2 text-center">예약</Link>}
        </div>
      </div>
      <div className="flex justify-center border-y-2 [&>*]:mx-2">
        <div className={tabIndex === 0 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(0)}}>가게 정보</div>
        <div className={tabIndex === 1 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(1)}}>위치 / 주차</div>
        <div className={tabIndex === 2 ? selectedTabButton : tabButton} onClick={()=>{setTabIndex(2)}}>리뷰</div>
      </div>
      <div>
        {tabIndex === 0 && (data && <PlaceDetailInfo placeDetail={data}/> || <div>에러 발생</div>)}
        {tabIndex === 1 && <PlaceMapInfo address={data.address} latitude={data.latitude} longitude={data.longitude}/>}
        {tabIndex === 2 && <ReviewInfo ref={pageRef}/>} 
      </div>
    </div> || <div></div>
  );
};