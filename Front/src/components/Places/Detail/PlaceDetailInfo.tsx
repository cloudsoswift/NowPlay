import { GrDocumentText, GrMapLocation } from "react-icons/gr";
import { ImPhone } from "react-icons/im";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { TStoreDetail } from "../../../utils/api/graphql";
type Props = {
  placeDetail: TStoreDetail;
};
const day: {[key:string]: string} = {
  "monday": "월",
  "tuesday": "화",
  "wendesday": "수",
  "thursday": "목",
  "friday": "금",
  "saturday": "토",
  "sunday": "일",
}
export const PlaceDetailInfo = ({ placeDetail }: Props) => {
  return (
    <div className="[&>*]:border-t-2 first:border-t-0">
      <div className="border-t-0 flex p-2 text-lg items-center first:border-t-0">
        <GrMapLocation className="mr-2 text-lg" /> {placeDetail.address}
      </div>
      <div className="grid p-2 text-lg items-center">
        영업시간{" "}
        {placeDetail.businessHourList.map((bh) => (
          <div className=""><span>{day[bh.dayOfWeek]}</span>{bh.open + " ~ " + bh.close}</div>
        ))}
      </div>
      <div className="flex p-2 text-lg items-center">
        <ImPhone className="mr-2 text-lg" />
        {placeDetail.contactNumber}
      </div>
      <div className="flex p-2 text-lg items-center">
        <HiOutlineGlobeAlt className="mr-2 text-lg" />
        {placeDetail.homepage}
      </div>
      <div className="flex p-2 text-lg items-center">
        <GrDocumentText className="mr-2 text-lg" />
        {placeDetail.explanation}
      </div>
      <div>
        {/* <div className="text-center">사업장 사진들</div>
        <div className="grid grid-cols-2">
          {placeDetail..map((a) => (
            <div>a</div>
          ))}
        </div> */}
      </div>
    </div>
  );
};
