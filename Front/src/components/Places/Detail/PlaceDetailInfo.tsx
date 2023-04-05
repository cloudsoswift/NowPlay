import { GrDocumentText, GrMapLocation } from "react-icons/gr";
import { ImPhone } from "react-icons/im";
import { TStoreDetail } from "../Types";
import { HiOutlineGlobeAlt } from "react-icons/hi";
type Props = {
  placeDetail: TStoreDetail;
};
export const PlaceDetailInfo = ({ placeDetail }: Props) => {
  return (
    <div className="[&>*]:border-t-2 first:border-t-0">
      <div className="border-t-0 flex p-2 text-lg items-center first:border-t-0">
        <GrMapLocation className="mr-2 text-lg" /> {placeDetail.address}
      </div>
      <div>
        영업시간{" "}
        {placeDetail.businessHourList.map((a) => (
          <div>a</div>
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
