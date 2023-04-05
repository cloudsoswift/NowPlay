import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { DatePicker } from "../../components/Places/Reservation/DatePicker";
import { RequestForm } from "../../components/Places/Reservation/RequestForm";
import { TimePicker } from "../../components/Places/Reservation/TimePicker";
import api from "../../utils/api/api";
import { TStoreDetail } from "../../utils/api/graphql";
import { userInfoAtom } from "../../utils/recoil/userAtom";

type Props = {
  
};
export type TReservationInfo = {
  dateTime: moment.Moment;
  request: string;
  dateChecked: boolean;
  timeChecked: boolean;
}
export const reservationInfo = atom<TReservationInfo>({key: "reservationInfo", default: {dateTime: moment(), request: "", dateChecked: false, timeChecked: false,}});
export const PlaceReservationPage = (props: Props) => {
  const reservationInfoValue = useRecoilValue(reservationInfo);
  const {userIdx} = useRecoilValue(userInfoAtom);
  const {id} = useParams();
  const fetchStoreDetail = () => {
    return api.get(`place/${id}/store`).then(({data})=>data);
  }
  const {data, error, isLoading} = useQuery<TStoreDetail>(["storeDetail"], fetchStoreDetail);
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(reservationInfoValue.dateTime.format());
    api.post("reservation", {
      "history": reservationInfoValue.request,
      "reserverIdx": userIdx,
      "storeIdx": id,
      "time": reservationInfoValue.dateTime.format('YYYY-MM-DDTHH:mm:ss[Z]')
    }).then((response)=>{
      switch(response.status){
        case 200:
        case 201:
          alert("예약에 성공했습니다.");
          navigate(`/mobile/places/${id}`);
          break;
        default:
          alert("예약에 실패했습니다. 다시 시도하거나 다른 날짜를 선택해주세요.");
          break;
      }
    })
  }
  return (
    <div className="px-4 h-[calc(100vh-128px)] overflow-y-scroll">
      <DatePicker businessHour={data?.businessHourList || []} />
      <TimePicker businessHour={data?.businessHourList || []} />
      <RequestForm />
      <button className="w-full border" disabled={!(reservationInfoValue.dateChecked && reservationInfoValue.timeChecked && reservationInfoValue.request.trim().length > 0)} onClick={handleSubmit}>예약하기</button>
    </div>
  );
};