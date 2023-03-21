import { TPlaceDetail } from "../Types";

type Props = {
  placeDetail: TPlaceDetail 
};
export const PlaceDetailInfo = ({placeDetail}: Props) => {
  return (
    <div className="">
      <div>사업장 주소 {placeDetail.address}</div>
      <div>영업시간 {placeDetail.businessTimes.map((a)=><div>a</div>)}</div>
      <div>전화 번호{placeDetail.contactNumber}</div>
      <div>웹사이트 주소{placeDetail.homepage}</div>
      <div>사업장 사진들 {placeDetail.imageURLs.map((a)=><div>a</div>)}</div>
    </div>
  );
};